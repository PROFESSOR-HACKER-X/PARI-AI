document.addEventListener('DOMContentLoaded', () => {
    const photoUpload = document.getElementById('photo-upload');
    const originalPhoto = document.getElementById('original-photo');
    const enhanceButton = document.getElementById('enhance-button');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const enhancedSection = document.getElementById('enhanced-section');
    const enhancedPhotos = document.querySelectorAll('.enhanced-gallery img');

    const messageBoxIcon = document.getElementById('message-box-icon');
    const messageModal = document.getElementById('message-modal');
    const closeButton = document.querySelector('.close-button');
    const sendMessageButton = document.getElementById('send-message-button');
    const userMessageInput = document.getElementById('user-message');

    let originalPhotoBlob = null; // To store the photo for sending via WhatsApp

    // Handle photo upload
    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            originalPhotoBlob = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                originalPhoto.src = e.target.result;
                imagePreviewContainer.style.display = 'block';
                enhanceButton.disabled = false;
                enhancedSection.classList.add('hidden'); // Hide enhanced section if new photo is uploaded
            };
            reader.readAsDataURL(file);
        } else {
            imagePreviewContainer.style.display = 'none';
            enhanceButton.disabled = true;
            originalPhotoBlob = null;
        }
    });

    // Handle enhance button click
    enhanceButton.addEventListener('click', () => {
        // This is a placeholder for the actual AI enhancement process.
        // In a real application, you would send the photo to a backend server here.
        alert('Enhancing photo... (This is a mock process)');

        // Simulate 3 enhanced photos (using the same original for this demo)
        setTimeout(() => {
            const originalSrc = originalPhoto.src;
            enhancedPhotos[0].src = originalSrc;
            enhancedPhotos[1].src = originalSrc;
            enhancedPhotos[2].src = originalSrc;

            enhancedSection.classList.remove('hidden');
        }, 2000); // Simulate a 2-second delay
    });

    // Handle message box icon click to show the modal
    messageBoxIcon.addEventListener('click', () => {
        messageModal.classList.remove('hidden');
    });

    // Handle close button click
    closeButton.addEventListener('click', () => {
        messageModal.classList.add('hidden');
    });

    // Handle send message button click
    sendMessageButton.addEventListener('click', () => {
        const userMessage = userMessageInput.value;
        const enhancedImages = Array.from(enhancedPhotos).map(img => img.src);

        if (originalPhotoBlob) {
            // In a real application, this is where you would call a backend API
            // to send the data (message, original photo, enhanced photos) to the WhatsApp number.
            // The WhatsApp API (like Twilio, Vonage, or the official Business API)
            // would be used on the server side to handle this.
            
            // The following is a placeholder for the actual logic.
            // Sending images directly to a WhatsApp number from a browser is not possible
            // without a backend and an API.
            
            // Example of what the backend would do:
            // 1. Receive the user message, original image, and enhanced images.
            // 2. Use a WhatsApp API client to send them to the specified number.
            
            alert(`Sending message to WhatsApp...
            Message: "${userMessage}"
            Original Photo: ${originalPhotoBlob.name}
            Enhanced Photos: ${enhancedImages.length} images
            (This is a mock action. A backend is required for actual WhatsApp integration.)`);

            // Clear input and close modal
            userMessageInput.value = '';
            messageModal.classList.add('hidden');
        } else {
            alert('Please upload a photo and enhance it first.');
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === messageModal) {
            messageModal.classList.add('hidden');
        }
    });
});
