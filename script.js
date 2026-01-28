// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const currentTitle = document.getElementById('currentTitle');
const photoCards = document.querySelectorAll('.photo-card');
const photoViewer = document.getElementById('photoViewer');
const viewerImage = document.getElementById('viewerImage');
const viewerPhotoTitle = document.getElementById('viewerPhotoTitle');
const viewerPhotoSubtitle = document.getElementById('viewerPhotoSubtitle');
const closeViewer = document.getElementById('closeViewer');
const checkboxes = document.querySelectorAll('.checkbox');

// Initialize Gallery
function initGallery() {
    setupEventListeners();
    setupCheckboxes();
}

// Setup Event Listeners
function setupEventListeners() {
    // Bottom navigation clicks
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            
            // Update active navigation button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update page title
            updatePageTitle(tab);
            
            // Show the selected tab content
            showTab(tab);
        });
    });
    
    // Photo card clicks for viewer
    photoCards.forEach(card => {
        card.addEventListener('click', () => {
            const photoId = card.getAttribute('data-photo-id');
            const photoTitle = card.querySelector('.photo-title').textContent;
            const photoSubtitle = card.querySelector('.photo-subtitle').textContent;
            const photoTag = card.querySelector('.photo-tag').textContent;
            const imgSrc = card.querySelector('img').src;
            
            openPhotoViewer(imgSrc, photoTitle, photoSubtitle, photoTag);
        });
    });
    
    // Close viewer
    closeViewer.addEventListener('click', () => {
        photoViewer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close viewer when clicking outside
    photoViewer.addEventListener('click', (e) => {
        if (e.target === photoViewer) {
            photoViewer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (photoViewer.style.display === 'flex') {
            if (e.key === 'Escape') {
                photoViewer.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Album item clicks
    const albumItems = document.querySelectorAll('.album-item');
    albumItems.forEach(item => {
        item.addEventListener('click', () => {
            const albumName = item.querySelector('.album-name').textContent;
            showToast(`Opening ${albumName} album`);
        });
    });
    
    // Action card clicks
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const action = card.querySelector('.action-title').textContent;
            showToast(`${action} feature activated`);
        });
    });
    
    // More item clicks
    const moreItems = document.querySelectorAll('.more-item');
    moreItems.forEach(item => {
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('.checkbox');
            checkbox.classList.toggle('checked');
            
            if (checkbox.classList.contains('checked')) {
                if (!checkbox.querySelector('i')) {
                    const checkIcon = document.createElement('i');
                    checkIcon.className = 'fas fa-check';
                    checkbox.appendChild(checkIcon);
                }
            } else {
                const icon = checkbox.querySelector('i');
                if (icon) {
                    checkbox.removeChild(icon);
                }
            }
            
            const title = item.querySelector('.more-title').textContent;
            const state = checkbox.classList.contains('checked') ? 'enabled' : 'disabled';
            showToast(`${title} ${state}`);
        });
    });
    
    // Action buttons in viewer
    const viewerActionButtons = document.querySelectorAll('.action-btn');
    viewerActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (icon.classList.contains('fa-heart')) {
                button.classList.toggle('liked');
                showToast('Photo liked');
            } else if (icon.classList.contains('fa-share-alt')) {
                showToast('Sharing photo...');
            } else if (icon.classList.contains('fa-trash-alt')) {
                showToast('Photo moved to trash');
            }
        });
    });
}

// Setup Checkboxes
function setupCheckboxes() {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            checkbox.classList.toggle('checked');
            
            if (checkbox.classList.contains('checked')) {
                if (!checkbox.querySelector('i')) {
                    const checkIcon = document.createElement('i');
                    checkIcon.className = 'fas fa-check';
                    checkbox.appendChild(checkIcon);
                }
            } else {
                const icon = checkbox.querySelector('i');
                if (icon) {
                    checkbox.removeChild(icon);
                }
            }
        });
    });
}

// Update Page Title
function updatePageTitle(tab) {
    const titles = {
        'photos': 'Photos',
        'albums': 'Albums',
        'tools': 'Tools'
    };
    currentTitle.textContent = titles[tab];
}

// Show Selected Tab
function showTab(tab) {
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tab}Tab`).classList.add('active');
}

// Open Photo Viewer
function openPhotoViewer(imgSrc, title, subtitle, tag) {
    viewerImage.src = imgSrc;
    viewerPhotoTitle.textContent = title;
    viewerPhotoSubtitle.textContent = `${subtitle} • ${tag}`;
    
    photoViewer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Show Toast Notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Style toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        z-index: 2000;
        animation: toastSlideIn 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Remove after 2.5 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Add toast animations
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes toastSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes toastSlideOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(toastStyles);

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', initGallery);

// Sample photo data (for demonstration)
const photoData = {
    '1': {
        title: 'M. A. HAYI',
        subtitle: 'mazey.ru',
        tag: 'Trods'
    },
    '2': {
        title: 'M. A. HAYI',
        subtitle: 'mazey.ru',
        tag: 'Trods'
    },
    '3': {
        title: 'M. A.',
        subtitle: 'mazey.ru',
        tag: 'Trods'
    },
    '4': {
        title: 'M. A. HAYI',
        subtitle: 'mazey.ru',
        tag: 'Trods'
    },
    '5': {
        title: 'M. A. HAYI',
        subtitle: 'mazey.ru',
        tag: 'Trods'
    },
    '6': {
        title: 'M. A.',
        subtitle: 'mazey.ru',
        tag: 'Trods'
    }
};

// Album data
const albumData = {
    'Camera': 207,
    'Screenshot': 467,
    'Restored': 2,
    'Download': 1183,
    'Messenger': 2,
    'Messenger2': 1,
    'Remini': 11,
    'WhatsApp': 42,
    'facebook': 24
};