// Data Store Algorithm
function detectFakeProfile(username, following, followers, age, bio, profilePic) {
    // Check if the username starts with "fake_"
    if (username.startsWith('fake_')) {
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
  
  // Example Usage
  const isFake = detectFakeProfile('john_doe', 100, 50, 30, 'I am a real person', 'https://example.com/profile_pic.jpg');
  console.log(isFake ? 'Fake Profile' : 'Real Profile');
  