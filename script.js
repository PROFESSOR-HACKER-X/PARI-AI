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

    let originalPhotoFile = null; // Store the original file object
    let enhancedPhotoBlobs = []; // Store the enhanced image blobs

    // Handle photo upload
    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            originalPhotoFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                originalPhoto.src = e.target.result;
                imagePreviewContainer.style.display = 'block';
                enhanceButton.disabled = false;
                enhancedSection.classList.add('hidden'); // Hide enhanced section if a new photo is uploaded
            };
            reader.readAsDataURL(file);
        } else {
            imagePreviewContainer.style.display = 'none';
            enhanceButton.disabled = true;
            originalPhotoFile = null;
        }
    });

    // Handle enhance button click
    enhanceButton.addEventListener('click', () => {
        alert('Enhancing photo... Please wait.');
        enhanceButton.disabled = true;

        // Simulate a back-end call to the AI model
        // In a real app, you would send originalPhotoFile to your server here
        setTimeout(() => {
            const originalSrc = originalPhoto.src;
            enhancedPhotoBlobs = [];

            // Simulate the enhanced images coming from the server
            // For this demo, we use the original image's Data URL
            enhancedPhotos.forEach((img, index) => {
                img.src = originalSrc;
                enhancedPhotoBlobs.push(originalSrc); // Store the Data URL for sending later
            });

            enhancedSection.classList.remove('hidden');
            enhanceButton.disabled = false;
        }, 2000); // 2-second delay to simulate processing
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
    sendMessageButton.addEventListener('click', async () => {
        const userMessage = userMessageInput.value;

        if (!originalPhotoFile) {
            alert('Please upload a photo first.');
            return;
        }

        // Prepare data to send to the back-end
        const formData = new FormData();
        formData.append('message', userMessage);
        formData.append('originalPhoto', originalPhotoFile);

        // Add enhanced photos to the form data
        enhancedPhotoBlobs.forEach((blob, index) => {
            formData.append(`enhancedPhoto${index + 1}`, blob);
        });

        try {
            // Send data to your back-end server endpoint
            const response = await fetch('/send-to-whatsapp', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert('Message and photos sent to WhatsApp successfully!');
                userMessageInput.value = '';
                messageModal.classList.add('hidden');
            } else {
                alert(`Error: ${result.message || 'Failed to send to WhatsApp.'}`);
            }
        } catch (error) {
            console.error('Error sending data:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === messageModal) {
            messageModal.classList.add('hidden');
        }
    });
});
