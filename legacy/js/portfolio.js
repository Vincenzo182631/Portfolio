// Portfolio JavaScript functionality

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    setupPortfolioFilter();
    setupModals();
});

// Portfolio Filter System
function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-neon-blue', 'to-neon-purple');
                btn.classList.add('bg-cyber-gray', 'border', 'border-neon-blue/30', 'hover:border-neon-blue');
            });
            
            this.classList.add('active', 'bg-gradient-to-r', 'from-neon-blue', 'to-neon-purple');
            this.classList.remove('bg-cyber-gray', 'border', 'border-neon-blue/30', 'hover:border-neon-blue');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'all 0.5s ease';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    item.style.transition = 'all 0.3s ease';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal System
function setupModals() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(projectId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    const projectData = getProjectData(projectId);
    
    modalContent.innerHTML = `
        <div class="p-8">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-space font-bold text-gradient bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    ${projectData.title}
                </h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-white text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Project Image/Icon -->
            <div class="aspect-video bg-gradient-to-br ${projectData.gradient} rounded-xl flex items-center justify-center mb-6">
                <i class="${projectData.icon} text-8xl opacity-50"></i>
            </div>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
                ${projectData.tags.map(tag => `
                    <span class="px-3 py-1 bg-${tag.color}/20 text-${tag.color} text-sm rounded-full">${tag.text}</span>
                `).join('')}
            </div>
            
            <!-- Description -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4 text-neon-blue">Project Overview</h3>
                <p class="text-gray-300 leading-relaxed mb-4">${projectData.description}</p>
                <p class="text-gray-300 leading-relaxed">${projectData.details}</p>
            </div>
            
            <!-- Key Features -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4 text-neon-purple">Key Features</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${projectData.features.map(feature => `
                        <div class="flex items-center">
                            <i class="fas fa-check text-neon-blue mr-3"></i>
                            <span class="text-gray-300">${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Results -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4 text-neon-pink">Results Achieved</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${projectData.results.map(result => `
                        <div class="text-center bg-cyber-dark/50 rounded-lg p-4">
                            <div class="text-2xl font-bold text-${result.color} mb-2">${result.value}</div>
                            <div class="text-gray-400 text-sm">${result.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Technologies -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4 text-neon-blue">Technologies Used</h3>
                <div class="flex flex-wrap gap-3">
                    ${projectData.technologies.map(tech => `
                        <span class="bg-cyber-dark/50 border border-neon-blue/30 px-4 py-2 rounded-full text-sm">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <!-- CTA -->
            <div class="text-center pt-6 border-t border-gray-700">
                <p class="text-gray-300 mb-4">Interested in a similar solution for your business?</p>
                <a href="contact.html" class="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink transition-all duration-300 px-8 py-4 rounded-full text-white font-semibold text-lg">
                    Start Your Project
                </a>
            </div>
        </div>
    `;
    
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

function getProjectData(projectId) {
    const projects = {
        project1: {
            title: 'E-commerce Automation Suite',
            gradient: 'from-neon-blue/20 to-neon-purple/20',
            icon: 'fas fa-shopping-cart text-neon-blue',
            tags: [
                { text: 'Zapier', color: 'neon-blue' },
                { text: 'E-commerce', color: 'neon-purple' },
                { text: 'Automation', color: 'neon-pink' }
            ],
            description: 'A comprehensive automation solution for a growing e-commerce business that was struggling with manual order processing and customer communication.',
            details: 'This project involved creating a complete automated workflow that handles everything from order confirmation to shipping notifications, inventory management, and customer follow-up sequences. The system integrates with Shopify, email marketing platforms, and fulfillment services.',
            features: [
                'Automated order processing workflow',
                'Inventory management sync',
                'Customer communication sequences',
                'Shipping and tracking notifications',
                'Abandoned cart recovery system',
                'Customer segmentation and tagging',
                'Analytics and reporting dashboard',
                'Return and refund automation'
            ],
            results: [
                { value: '150%', label: 'ROI Increase', color: 'neon-blue' },
                { value: '40%', label: 'Faster Processing', color: 'neon-purple' },
                { value: '25%', label: 'Cost Reduction', color: 'neon-pink' }
            ],
            technologies: ['Zapier', 'Shopify', 'Klaviyo', 'ShipStation', 'Google Sheets']
        },
        project2: {
            title: 'Digital Agency CRM Setup',
            gradient: 'from-neon-purple/20 to-neon-pink/20',
            icon: 'fas fa-rocket text-neon-purple',
            tags: [
                { text: 'GoHighLevel', color: 'neon-purple' },
                { text: 'CRM', color: 'neon-pink' },
                { text: 'Agency', color: 'neon-blue' }
            ],
            description: 'Complete GoHighLevel implementation for a digital marketing agency managing multiple client campaigns and lead generation efforts.',
            details: 'This project focused on creating a unified system for managing leads, clients, and campaigns across multiple service offerings. The setup includes custom pipelines, automated follow-up sequences, and comprehensive reporting for both internal team management and client reporting.',
            features: [
                'Multi-pipeline lead management',
                'Automated lead nurturing sequences',
                'Client communication workflows',
                'Team collaboration tools',
                'Custom reporting dashboards',
                'SMS and email campaign management',
                'Appointment scheduling system',
                'Client portal access'
            ],
            results: [
                { value: '300+', label: 'Leads per Month', color: 'neon-purple' },
                { value: '85%', label: 'Follow-up Rate', color: 'neon-pink' },
                { value: '60%', label: 'Time Saved', color: 'neon-blue' }
            ],
            technologies: ['GoHighLevel', 'Calendly', 'Twilio', 'Google Analytics', 'Zapier']
        },
        project3: {
            title: 'SaaS Lead Generation Funnel',
            gradient: 'from-neon-pink/20 to-neon-blue/20',
            icon: 'fas fa-filter text-neon-pink',
            tags: [
                { text: 'Funnel', color: 'neon-pink' },
                { text: 'Lead Gen', color: 'neon-blue' },
                { text: 'SaaS', color: 'neon-purple' }
            ],
            description: 'High-converting lead generation funnel designed for a B2B SaaS company targeting enterprise clients with a complex sales cycle.',
            details: 'This sophisticated funnel includes multiple touchpoints and qualification steps to ensure only high-quality leads reach the sales team. The system uses behavioral triggers and dynamic content to personalize the experience for different visitor segments.',
            features: [
                'Multi-step lead qualification process',
                'Dynamic content personalization',
                'Behavioral trigger sequences',
                'Lead scoring and grading',
                'Sales team notification system',
                'A/B tested landing pages',
                'Conversion tracking and analytics',
                'CRM integration and data sync'
            ],
            results: [
                { value: '32%', label: 'Conversion Rate', color: 'neon-pink' },
                { value: '245%', label: 'Lead Quality Increase', color: 'neon-blue' },
                { value: '18%', label: 'Sales Close Rate', color: 'neon-purple' }
            ],
            technologies: ['GoHighLevel', 'HubSpot', 'Google Analytics', 'Hotjar', 'Unbounce']
        },
        project4: {
            title: 'Multi-Platform Integration System',
            gradient: 'from-neon-blue/20 to-neon-purple/20',
            icon: 'fas fa-link text-neon-blue',
            tags: [
                { text: 'Make', color: 'neon-blue' },
                { text: 'Integration', color: 'neon-purple' },
                { text: 'API', color: 'neon-pink' }
            ],
            description: 'Complex integration project connecting 12 different platforms to create a unified business operations system.',
            details: 'This ambitious project required deep understanding of API connections, data formatting, and error handling to ensure reliable data flow between all platforms. The system includes real-time sync capabilities and comprehensive monitoring.',
            features: [
                '12 platform integrations',
                'Real-time data synchronization',
                'Error handling and monitoring',
                'Data transformation and formatting',
                'Conditional logic workflows',
                'Scheduled automation tasks',
                'Performance optimization',
                'Backup and recovery systems'
            ],
            results: [
                { value: '12', label: 'Platforms Connected', color: 'neon-blue' },
                { value: '99.8%', label: 'Uptime Achieved', color: 'neon-purple' },
                { value: '75%', label: 'Manual Work Eliminated', color: 'neon-pink' }
            ],
            technologies: ['Make', 'REST APIs', 'Webhooks', 'JSON', 'Custom Scripts']
        },
        project5: {
            title: 'Real Estate Lead Pipeline',
            gradient: 'from-neon-purple/20 to-neon-pink/20',
            icon: 'fas fa-home text-neon-purple',
            tags: [
                { text: 'GoHighLevel', color: 'neon-purple' },
                { text: 'Real Estate', color: 'neon-pink' },
                { text: 'Pipeline', color: 'neon-blue' }
            ],
            description: 'Automated lead nurturing and follow-up system specifically designed for real estate agents and brokerages.',
            details: 'This system handles leads from multiple sources including websites, social media, and referrals. It includes sophisticated nurturing sequences tailored to different property types and buyer personas, with automated scheduling and follow-up reminders.',
            features: [
                'Multi-source lead capture',
                'Property-specific nurturing sequences',
                'Automated appointment scheduling',
                'SMS and email follow-up campaigns',
                'Lead temperature tracking',
                'Market update broadcasts',
                'Referral tracking system',
                'Performance analytics dashboard'
            ],
            results: [
                { value: '85%', label: 'Follow-up Rate', color: 'neon-purple' },
                { value: '45%', label: 'More Appointments', color: 'neon-pink' },
                { value: '120%', label: 'Lead Response Speed', color: 'neon-blue' }
            ],
            technologies: ['GoHighLevel', 'Zillow API', 'MLS Integration', 'Calendly', 'Twilio']
        },
        project6: {
            title: 'Custom Data Processing Pipeline',
            gradient: 'from-neon-pink/20 to-neon-blue/20',
            icon: 'fas fa-project-diagram text-neon-pink',
            tags: [
                { text: 'n8n', color: 'neon-pink' },
                { text: 'Custom', color: 'neon-blue' },
                { text: 'Data Processing', color: 'neon-purple' }
            ],
            description: 'Advanced n8n workflow for processing and analyzing large volumes of customer data from multiple sources.',
            details: 'This project involved creating a self-hosted n8n instance with custom nodes for specialized data processing. The system handles data validation, transformation, and routing to various destinations based on complex business rules.',
            features: [
                'Custom node development',
                'Advanced data validation',
                'Multi-source data aggregation',
                'Real-time processing capabilities',
                'Error handling and retry logic',
                'Data quality monitoring',
                'Automated reporting generation',
                'Scalable architecture design'
            ],
            results: [
                { value: '10K+', label: 'Records per Day', color: 'neon-pink' },
                { value: '99.9%', label: 'Data Accuracy', color: 'neon-blue' },
                { value: '90%', label: 'Processing Time Reduction', color: 'neon-purple' }
            ],
            technologies: ['n8n', 'Node.js', 'PostgreSQL', 'Docker', 'Custom APIs']
        }
    };
    
    return projects[projectId] || {};
}