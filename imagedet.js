document.getElementById('compareButton').addEventListener('click', function() {
    var image1 = document.getElementById('image1').files[0];
    var image2 = document.getElementById('image2').files[0];

    if (!image1 || !image2) {
        alert('Please upload both images.');
        return;
    }

    var reader1 = new FileReader();
    var reader2 = new FileReader();

    reader1.onload = function(event) {
        var dataUrl1 = event.target.result;
        reader2.readAsDataURL(image2);

        reader2.onload = function(event) {
            var dataUrl2 = event.target.result;
            compareImages(dataUrl1, dataUrl2);
        };
    };

    reader1.readAsDataURL(image1);
});

function compareImages(imageData1, imageData2) {
    // Here you can implement the image comparison logic
    // For demonstration purpose, let's just compare if the base64 data strings are the same
    if (imageData1 === imageData2) {
        displayResult('Real images');
    } else {
        displayResult('Fake images');
        displayReportButton();
    }
}

function displayResult(result) {
    document.getElementById('result').textContent = result;
}

function displayReportButton() {
    var reportButton = document.createElement('button');
    reportButton.textContent = 'Report';
    reportButton.classList.add('button', 'red');
    reportButton.onclick = function() {
        window.location.href = 'report1.html';
    };
    document.getElementById('container').appendChild(reportButton);
}

function displayPopup() {
    var popup = document.getElementById('popup');
    var popupContent = document.getElementById('popup-content');

    popup.style.display = 'block';
    popupContent.style.animation = 'popupAnimation 1s ease forwards';

    setTimeout(function() {
        popup.style.display = 'none';
        popupContent.style.animation = 'none';
    }, 3000); // Adjust the time for how long the popup should be displayed
}
