import { defineStore } from 'pinia';

// Use a simple fetch wrapper or axios. Using fetch for minimal dependencies.
const API_URL = '/api';

export const useReportStore = defineStore('report', {
    state: () => ({
        currentStep: 1,
        reportData: {
            category: '',
            location: '',
            address: '',
            items: [], // photos/files
            description: ''
        },
        userReports: [],
        adminReports: []
    }),

    actions: {
        setCategory(category) {
            this.reportData.category = category;
        },

        setLocation(location, address) {
            this.reportData.location = location;
            this.reportData.address = address;
        },

        setDetails(details) {
            this.reportData.items = details.items;
            this.reportData.description = details.description;
        },

        async submitReport() {
            try {
                // Validation: Check if critical data exists (might be lost on refresh)
                if (!this.reportData.category) {
                    return { success: false, message: "Data laporan kosong. Mohon kembali ke Step 1." };
                }

                const formData = new FormData();
                formData.append('category', this.reportData.category);
                formData.append('location', this.reportData.location || '');
                formData.append('address', this.reportData.address || '');
                formData.append('description', this.reportData.description || '');
                formData.append('user_id', localStorage.getItem('user_id') || 1);

                // Append photo file if exists
                // Append photo files
                if (this.reportData.items && this.reportData.items.length > 0) {
                    this.reportData.items.forEach(file => {
                        if (file instanceof File) {
                            formData.append('photos', file);
                        }
                    });
                }

                const response = await fetch(`${API_URL}/reports`, {
                    method: 'POST',
                    // Content-Type header not needed for FormData, browser sets it with boundary
                    body: formData
                });

                const textData = await response.text();
                let data;
                try {
                    data = JSON.parse(textData);
                } catch (e) {
                    console.error("Non-JSON response:", textData);
                    throw new Error(`Server Error: ${textData || response.statusText}`);
                }

                if (!response.ok) {
                    throw new Error(data.message || 'Gagal mengirim laporan ke server');
                }

                // Add to local state for immediate UI feedback (optional)
                this.userReports.unshift({
                    id: data.id,
                    date: new Date().toLocaleDateString(),
                    category: data.category,
                    status: 'Menunggu',
                    desc: data.description
                });

                // Reset form
                this.resetForm();
                return { success: true };
            } catch (error) {
                console.error('Submit Error:', error);
                return { success: false, message: error.message };
            }
        },

        async fetchReports(userId) {
            try {
                if (!userId) {
                    this.userReports = [];
                    return;
                }
                const url = `${API_URL}/reports?user_id=${userId}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch reports');
                const data = await response.json();

                this.userReports = data.map(r => ({
                    id: `LAP-${r.id}`, // Format for display
                    db_id: r.id,      // Real ID
                    date: new Date(r.created_at).toLocaleDateString(),
                    category: r.category,
                    status: r.status,
                    desc: r.description,
                    user: r.user_name || 'Anonymous',
                    feedback: r.feedback // Added feedback
                }));
            } catch (error) {
                console.error('Fetch Error:', error);
                this.userReports = [];
            }
        },

        async fetchAllReports() {
            try {
                const url = `${API_URL}/reports`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch all reports');
                const data = await response.json();

                this.adminReports = data.map(r => ({
                    id: `LAP-${r.id}`,
                    db_id: r.id,
                    date: new Date(r.created_at).toLocaleDateString(),
                    category: r.category,
                    status: r.status,
                    desc: r.description,
                    user: r.user_name || 'Anonymous',
                    photo: r.photo_path
                }));
            } catch (error) {
                console.error('Fetch All Error:', error);
                this.adminReports = [];
            }
        },

        async fetchReportById(id) {
            try {
                const response = await fetch(`${API_URL}/reports/${id}`);
                if (!response.ok) throw new Error('Failed to fetch report');
                return await response.json();
            } catch (error) {
                console.error('Fetch One Error:', error);
                return null;
            }
        },

        async updateReportStatus(id, status, feedback = '') {
            try {
                const response = await fetch(`${API_URL}/reports/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status, feedback })
                });
                if (!response.ok) throw new Error('Failed to update status');

                // Update local state (both admin and user reports if possible)
                const updateState = (reports) => {
                    const index = reports.findIndex(r => r.db_id == id);
                    if (index !== -1) {
                        reports[index].status = status;
                        if (feedback) reports[index].feedback = feedback;
                    }
                };

                updateState(this.userReports);
                updateState(this.adminReports);

                return true;
            } catch (error) {
                console.error('Update Status Error:', error);
                return false;
            }
        },

        resetForm() {
            this.currentStep = 1;
            this.reportData = {
                category: '',
                location: '',
                address: '',
                items: [],
                description: ''
            };
        }
    }
});
