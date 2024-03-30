// Function to detect fake profile based on provided information
function detectFakeProfile(username, following, followers, age, bio, profilePic) {
  // Check if the username contains only alphanumeric characters
  const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Regular expression to match alphanumeric characters
  if (!alphanumericRegex.test(username)) {
      return true; // Considered fake if the username contains non-alphanumeric characters
  }

  // Check if the username starts with "fake_"
  if (username.startsWith('fake')) {
    return true; // Considered fake if the username starts with "fake_"
  }

  // Check if the number of following is significantly higher than the number of followers
  if (followers > 0 && following / followers > 10) {
    return true; // Considered fake if following/followers ratio is too high
  }

  // Check if the age of the profile is less than 7 days
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const profileCreationTimestamp = currentTimestamp - (age * 24 * 60 * 60); // Convert age to seconds
  if (profileCreationTimestamp > currentTimestamp - 7 * 24 * 60 * 60) {
    return true; // Considered fake if the profile is less than 7 days old
  }

  // Check if the bio is empty or contains suspicious keywords
  if (!bio || bio.toLowerCase().includes('fake') || bio.toLowerCase().includes('spam')) {
    return true; // Considered fake if the bio is empty or contains suspicious keywords
  }

  // Check if the profile picture URL is empty
  if (!profilePic) {
    return true; // Considered fake if the profile picture URL is empty
  }

  // If none of the above conditions are met, consider the profile as real
  return false;
}

// Function to handle form submission and profile checking
document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const following = parseInt(document.getElementById('following').value);
  const followers = parseInt(document.getElementById('followers').value);
  const age = parseInt(document.getElementById('age').value);
  const bio = document.getElementById('bio').value.trim();
  const profilePic = document.getElementById('profilePic').value.trim();
  
  // Check if any required field is empty
  if (username === '' || isNaN(following) || isNaN(followers) || isNaN(age)) {
      displayResult(false, 'Please fill in all required fields.');
      return;
  }
  
  // Check if the profile is fake or real
  const isFake = detectFakeProfile(username, following, followers, age, bio, profilePic);
  
  // Display the result
  displayResult(isFake, isFake ? 'This profile seems to be fake. Please report it!' : 'This profile appears to be legitimate.');
  
  // If profile is fake, show report button
  if (isFake) {
      showReportButton();
  }
});

// Function to display the result
function displayResult(isFake, message) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = message;
  resultDiv.style.color = isFake ? '#ff0000' : '#008000';
}

// Function to show report button
function showReportButton() {
  const reportBtnContainer = document.getElementById('reportBtnContainer');
  reportBtnContainer.innerHTML = ''; // Clear previous content if any
  
  const reportBtn = document.createElement('button');
  reportBtn.textContent = 'Report';
  reportBtn.style.backgroundColor = '#ff0000'; // Set background color to red
  reportBtn.style.color = '#fff'; // Set text color to white
  reportBtn.style.border = 'none'; // Remove border
  reportBtn.style.borderRadius = '4px'; // Add border radius
  reportBtn.style.padding = '10px 20px'; // Add padding
  reportBtn.style.cursor = 'pointer'; // Add cursor pointer
  reportBtn.addEventListener('click', redirectToReportPage);
  reportBtnContainer.appendChild(reportBtn);
}

// Function to redirect to report page
function redirectToReportPage() {
  // Redirect to the report page
  window.location.href = 'report.html';
}
