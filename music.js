// Song suggestions based on mood
const songSuggestions = {
    happy: ["Happy - Pharrell Williams", "Can't Stop the Feeling! - Justin Timberlake", "Uptown Funk - Mark Ronson ft. Bruno Mars"],
    sad: ["Someone Like You - Adele", "The Night We Met - Lord Huron", "Hurt - Johnny Cash"],
    relaxed: ["Weightless - Marconi Union", "Sunset Lover - Petit Biscuit", "Night Owl - Galimatias"],
    energetic: ["Stronger - Kanye West", "Lose Yourself - Eminem", "Don't Stop Me Now - Queen"],
    nostalgic: ["Yesterday - The Beatles", "Time After Time - Cyndi Lauper", "Summer of '69 - Bryan Adams"],
    calm: ["Clair de Lune - Debussy", "River Flows in You - Yiruma", "Spiegel im Spiegel - Arvo Pärt"]
  };
  
  // Function to get a song suggestion based on the mood
  function getSongSuggestion(mood) {
    // Normalize the mood input (convert to lowercase)
    const moodLower = mood.toLowerCase().trim();
    
    // Check if mood is in the songSuggestions object
    if (songSuggestions[moodLower]) {
      const songs = songSuggestions[moodLower];
      // Randomly select a song from the list
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      return randomSong;
    } else {
      // If mood not found, return a default message
      return "Sorry, we don't have song suggestions for that mood. Please try again.";
    }
  }
  
  // Get references to the DOM elements
  const moodInput = document.getElementById('mood-input');
  const submitButton = document.getElementById('submit-btn');
  const suggestedSong = document.getElementById('suggested-song');
  
  // Add event listener to the submit button
  submitButton.addEventListener('click', function () {
    const mood = moodInput.value;
    
    // Get a song suggestion based on the input mood
    const song = getSongSuggestion(mood);
    
    // Display the suggested song
    suggestedSong.textContent = song;
    
    // Clear the input field after submission
    moodInput.value = '';
  });