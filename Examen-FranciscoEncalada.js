const fs = require('fs');
const inquirer = require('inquirer');

const artistsFile = 'artists.json';
const songsFile = 'songs.json';

// READ
// Function which load the saved artist's array
function loadArtists() {
    try {
        const data = fs.readFileSync(artistsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Function which load the saved song's array
function loadSongs() {
    try {
        const data = fs.readFileSync(songsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Method which save the artists in a JSON file
function saveArtists(artists) {
    const data = JSON.stringify(artists, null, 2);
    fs.writeFileSync(artistsFile, data, 'utf8');
}

// Method which save the songs in a JSON file
function saveSongs(songs) {
    const data = JSON.stringify(songs, null, 2);
    fs.writeFileSync(songsFile, data, 'utf8');
}

// Function which shows the main menu with inquirer
function showMainMenu() {
    inquirer // Calling inquirer
        .prompt([ // Menu's parameters
            {
                type: 'list',
                name: 'option',
                message: 'Choose an option:',
                choices: ['Create', 'Read', 'Update', 'Delete', 'Exit'] // Menu's options
            }
        ])
        .then(answer => { // Menu's actions
            switch (answer.option) {
                case 'Create':
                    showCreateMenu();
                    break;
                case 'Read':
                    showReadMenu();
                    break;
                case 'Update':
                    showUpdateMenu();
                    break;
                case 'Delete':
                    showDeleteMenu();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit(0);
                    break;
                default:
                    console.log('Invalid option');
                    showMainMenu();
            }
        });
}

// Function which shows the sub-menu to create a new artist or song
function showCreateMenu() {
    inquirer // Calling inquirer
        .prompt([ // Menu's parameters
            {
                type: 'list',
                name: 'option',
                message: 'Choose an option:',
                choices: ['New Song', 'New Artist', 'Go Back'] // Menu's options
            }
        ])
        .then(answer => {  // Menu's actions
            switch (answer.option) {
                case 'New Song':
                    createSong();
                    break;
                case 'New Artist':
                    createArtist();
                    break;
                case 'Go Back':
                    showMainMenu();
                    break;
                default:
                    console.log('Invalid option');
                    showCreateMenu();
            }
        });
}

// Function which shows the sub-menu to read the songs and artists data
function showReadMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Choose an option:',
                choices: ['All Songs', 'All Artists', 'Song by ID', 'Artist by ID', 'Go Back']
            }
        ])
        .then(answer => {
            switch (answer.option) {
                case 'All Songs':
                    readAllSongs();
                    break;
                case 'All Artists':
                    readAllArtists();
                    break;
                case 'Song by ID':
                    readSongById();
                    break;
                case 'Artist by ID':
                    readArtistById();
                    break;
                case 'Go Back':
                    showMainMenu();
                    break;
                default:
                    console.log('Invalid option');
                    showReadMenu();
            }
        });
}

// Function which shows the sub-menu to update a song or an artist
function showUpdateMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Choose an option:',
                choices: ['Update a Song', 'Update an Artist', 'Go Back']
            }
        ])
        .then(answer => {
            switch (answer.option) {
                case 'Update a Song':
                    updateSong();
                    break;
                case 'Update an Artist':
                    updateArtist();
                    break;
                case 'Go Back':
                    showMainMenu();
                    break;
                default:
                    console.log('Invalid option');
                    showUpdateMenu();
            }
        });
}

// Function which shows the sub-menu to delete a song or an artist
function showDeleteMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Choose an option:',
                choices: ['Delete Song by ID', 'Delete Artist by ID', 'Go Back']
            }
        ])
        .then(answer => {
            switch (answer.option) {
                case 'Delete Song by ID':
                    deleteSongById();
                    break;
                case 'Delete Artist by ID':
                    deleteArtistById();
                    break;
                case 'Go Back':
                    showMainMenu();
                    break;
                default:
                    console.log('Invalid option');
                    showDeleteMenu();
            }
        });
}

// CRUD OPERATIONS
// CREATE
function createSong() { // Function which creates a new song
    inquirer // Calling inquirer
        .prompt([ // Input of the song's attributes
            {
                type: 'input',
                name: 'name',
                message: 'Enter the song name:'
            },
            {
                type: 'input',
                name: 'duration',
                message: 'Enter the song duration:'
            },
            {
                type: 'input',
                name: 'genre',
                message: 'Enter the song genre:'
            },
            {
                type: 'input',
                name: 'artistId',
                message: 'Enter the artist ID for the song:'
            }
        ])
        .then(answers => { // Menu's action
            const songs = loadSongs(); // Getting the current songs
            // Taking the song's attributes to save the new song
            const newSong = {
                id: songs.length + 1,
                name: answers.name,
                duration: answers.duration,
                genre: answers.genre,
                artistId: answers.artistId
            };
            songs.push(newSong); // Adding the new song to the array
            saveSongs(songs); // Saving the song's array in a file
            console.log('Song created successfully!');
            showCreateMenu(); // Returning to the main menu
        });
}

function createArtist() { // Function which creates a new song
    inquirer // Calling inquirer
        .prompt([ // Input of the artist's attributes
            {
                type: 'input',
                name: 'name',
                message: 'Enter the artist name:'
            },
            {
                type: 'input',
                name: 'dateOfBirth',
                message: 'Enter the artist date of birth (YYYY-MM-DD):'
            },
            {
                type: 'confirm',
                name: 'isGroup',
                message: 'Is the artist a group?',
                default: false
            },
            {
                type: 'input',
                name: 'height',
                message: 'Enter the artist height (in cm):'
            }
        ])
        .then(answers => { // Menu's action
            const artists = loadArtists();  // Getting the current artists
            // Taking the artist's attributes to save the new song
            const newArtist = {
                id: artists.length + 1,
                name: answers.name,
                dateOfBirth: answers.dateOfBirth,
                isGroup: answers.isGroup,
                height: parseInt(answers.height)
            };
            artists.push(newArtist); // Adding the new artist to the array
            saveArtists(artists); // Saving the artist's array in a file
            console.log('Artist created successfully!');
            showCreateMenu(); // Returning to the main menu
        });
}


// READ
function readAllSongs() { // Function which reads all the songs
    const songs = loadSongs();
    console.log('Songs:');
    songs.forEach(song => {
        console.log(`- Name: ${song.name}`);
        console.log(`  Duration: ${song.duration}`);
        console.log(`  Genre: ${song.genre}`);
        console.log(`  Artist ID: ${song.artistId}`);
        console.log('---');
    });
    showReadMenu();
}

function readAllArtists() { // Function which reads all the artists
    const artists = loadArtists();
    console.log('Artists:');
    artists.forEach(artist => {
        console.log(`- Name: ${artist.name}`);
        console.log(`  Date of Birth: ${artist.dateOfBirth}`);
        console.log(`  Is Group: ${artist.isGroup ? 'Yes' : 'No'}`);
        console.log(`  Height: ${artist.height} cm`);
        console.log('---');
    });
    showReadMenu();
}

function readSongById() { // Function which read a song by its ID
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'songId',
                message: 'Enter the song ID:'
            }
        ])
        .then(answers => {
            const songId = parseInt(answers.songId);
            const songs = loadSongs();
            const song = songs.find(s => s.id === songId);
            if (song) {
                console.log(`Song found - ID: ${song.id}`);
                console.log(`- Name: ${song.name}`);
                console.log(`  Duration: ${song.duration}`);
                console.log(`  Genre: ${song.genre}`);
                console.log(`  Artist ID: ${song.artistId}`);
            } else {
                console.log('Song not found.');
            }
            showReadMenu();
        });
}

function readArtistById() { // Function which reads an Artist by its ID
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'artistId',
                message: 'Enter the artist ID:'
            }
        ])
        .then(answers => {
            const artistId = parseInt(answers.artistId);
            const artists = loadArtists();
            const artist = artists.find(a => a.id === artistId);
            if (artist) {
                console.log(`Artist found - ID: ${artist.id}`);
                console.log(`- Name: ${artist.name}`);
                console.log(`  Date of Birth: ${artist.dateOfBirth}`);
                console.log(`  Is Group: ${artist.isGroup ? 'Yes' : 'No'}`);
                console.log(`  Height: ${artist.height} cm`);
            } else {
                console.log('Artist not found.');
            }
            showReadMenu();
        });
}

function readSongsByArtist(artistId) { // Function which reads all the songs by artists ID
    const songs = loadSongs();
    const artistSongs = songs.filter(song => song.artistId === artistId);

    if (artistSongs.length === 0) {
        console.log('No songs available for this artist.');
    } else {
        console.log(`Songs by Artist ID ${artistId}:`);
        artistSongs.forEach(song => {
            console.log(`- ID: ${song.id}`);
            console.log(`  Name: ${song.name}`);
            console.log(`  Duration: ${song.duration}`);
            console.log(`  Genre: ${song.genre}`);
            console.log(`  Artist ID: ${song.artistId}`);
        });
    }
}


// UPDATE
function updateSong() { // Function which updates a song by its ID
    const songs = loadSongs();
    if (songs.length === 0) {
        console.log('No songs available to update.');
        showUpdateMenu();
        return;
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'songId',
                message: 'Select the song to update:',
                choices: songs.map(song => ({
                    name: song.name,
                    value: song.id
                }))
            },
            {
                type: 'input',
                name: 'name',
                message: 'Enter the updated song name:'
            },
            {
                type: 'input',
                name: 'duration',
                message: 'Enter the updated song duration:'
            },
            {
                type: 'input',
                name: 'genre',
                message: 'Enter the updated song genre:'
            },
            {
                type: 'input',
                name: 'artistId',
                message: 'Enter the updated artist ID for the song:'
            }
        ])
        .then(answers => {
            const songId = answers.songId;
            const song = songs.find(s => s.id === songId);
            if (song) {
                song.name = answers.name;
                song.duration = answers.duration;
                song.genre = answers.genre;
                song.artistId = answers.artistId;
                saveSongs(songs);
                console.log('Song updated successfully!');
            } else {
                console.log('Invalid song selected.');
            }
            showUpdateMenu();
        });
}

function updateArtist() { // Function which updates an artist by its ID
    const artists = loadArtists();
    if (artists.length === 0) {
        console.log('No artists available to update.');
        showUpdateMenu();
        return;
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'artistId',
                message: 'Select the artist to update:',
                choices: artists.map(artist => ({
                    name: artist.name,
                    value: artist.id
                }))
            },
            {
                type: 'input',
                name: 'name',
                message: 'Enter the updated artist name:'
            },
            {
                type: 'input',
                name: 'dateOfBirth',
                message: 'Enter the updated artist date of birth (YYYY-MM-DD):'
            },
            {
                type: 'confirm',
                name: 'isGroup',
                message: 'Is the artist a group?',
                default: false
            },
            {
                type: 'input',
                name: 'height',
                message: 'Enter the updated artist height (in cm):'
            }
        ])
        .then(answers => {
            const artistId = answers.artistId;
            const artist = artists.find(a => a.id === artistId);
            if (artist) {
                artist.name = answers.name;
                artist.dateOfBirth = answers.dateOfBirth;
                artist.isGroup = answers.isGroup;
                artist.height = parseInt(answers.height);
                saveArtists(artists);
                console.log('Artist updated successfully!');
            } else {
                console.log('Invalid artist selected.');
            }
            showUpdateMenu();
        });
}

// DELETE
function deleteSongById() { // Function which deletes a song by its ID
    const songs = loadSongs();
    if (songs.length === 0) {
        console.log('No songs available to delete.');
        showDeleteMenu();
        return;
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'songId',
                message: 'Select the song to delete:',
                choices: songs.map(song => ({
                    name: song.name,
                    value: song.id
                }))
            }
        ])
        .then(answers => {
            const songId = answers.songId;
            const songIndex = songs.findIndex(s => s.id === songId);
            if (songIndex !== -1) {
                songs.splice(songIndex, 1);
                saveSongs(songs);
                console.log('Song deleted successfully!');
            } else {
                console.log('Invalid song selected.');
            }
            showDeleteMenu();
        });
}

function deleteArtistById() { // Function which delete an artist by its ID
    const artists = loadArtists();
    if (artists.length === 0) {
        console.log('No artists available to delete.');
        showDeleteMenu();
        return;
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'artistId',
                message: 'Select the artist to delete:',
                choices: artists.map(artist => ({
                    name: artist.name,
                    value: artist.id
                }))
            }
        ])
        .then(answers => {
            const artistId = answers.artistId;
            const artistIndex = artists.findIndex(a => a.id === artistId);
            if (artistIndex !== -1) {
                artists.splice(artistIndex, 1);
                saveArtists(artists);
                console.log('Artist deleted successfully!');
            } else {
                console.log('Invalid artist selected.');
            }
            showDeleteMenu();
        });
}

// MAIN FUNCTION
function main() {
    console.log('Welcome user');
    showMainMenu();
}



