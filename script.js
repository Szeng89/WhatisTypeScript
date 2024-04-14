document.addEventListener("DOMContentLoaded", function(){
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const wordElement = document.getElementById('word');
    const definitions = document.getElementById('definition');
    const examples = document.getElementById('example');
    const synonym = document.getElementById('synonyms');

    const dictionary = async (searchWord) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
            const data = await response.json();

            wordElement.textContent = data[0].word;
            const definition = data[0].meanings[0].definitions[0].definition;
            definitions.textContent = definition;



//            const synonyms = data[0].meanings[0].definitions[0].synonyms[0].synonyms;
//            synonym.textContent = synonyms.join(', ');

            let allSynonyms = "";

            for (const meaning of data[0].meanings) {
                for (const definition of meaning.definitions) {
                    if (definition.synonyms && definition.synonyms.length > 0) {
                        allSynonyms += definition.synonyms.join(', ') + " ";
                    }
                }
            }

            if (allSynonyms) {
                synonym.textContent = allSynonyms.trim();
            } else {
                synonym.textContent = "No synonyms found.";
            }


            console.log(data);


            //examples loop to find exanple
            let exampleFound = false;
            for (const meaning of data[0].meanings) {
                for (const definition of meaning.definitions) {
                    if (definition.example) {
                        examples.textContent = definition.example;
                        exampleFound = true;
                        break;
                    }
                }
                if (exampleFound) break;
            }

            if (!exampleFound) {
                examples.textContent = "No example found.";
            }

//            if (data[0].meanings[0].definitions[1] && data[0].meanings[0].definitions[1].synonyms) {
//                synonym.textContent = data[0].meanings[0].definitions[1].synonyms;
//            } else {
//                // Check other potential locations for an example
//                if (data[0].meanings[0].definitions[0].example) {
//                    synonym.textContent = data[0].meanings[0].definitions[0].synonyms;
//                } else {
//                    synonym.textContent = "No synonyms found.";
//                }
//            }


        } catch (error) {
            console.error("Error fetching data:", error);
            definitions.textContent = "An error occurred. Please try again.";
            examples.textContent = "An error occurred. Please try again.";
        }
    };

    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        dictionary(searchInput.value);
    });
    // Search on Enter key press
    searchInput.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            dictionary(searchInput.value);
        }
    });
});
