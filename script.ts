document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
    const wordElement = document.getElementById('word') as HTMLElement;
    const definitions = document.getElementById('definition') as HTMLElement;
    const examples = document.getElementById('example') as HTMLElement;
    const synonymsElement = document.getElementById('synonyms') as HTMLElement; 

    const dictionary = async (searchWord: string): Promise<void> => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
            const data = await response.json();

            wordElement.textContent = data[0].word;
            const definition = data[0].meanings[0].definitions[0].definition;
            definitions.textContent = definition;


            //Synonyms
            let synonymsList = data[0].meanings[0].synonyms;
            if (synonymsList && synonymsList.length > 0) {
                synonymsElement.textContent = synonymsList.join(", ");
            } else {
                synonymsElement.textContent = "No synonyms found.";
            }

            //Examples
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

        } catch (error) {
            console.error("Error fetching data:", error);
            definitions.textContent = "An error occurred. Please try again.";
            examples.textContent = "An error occurred. Please try again.";
            synonymsElement.textContent = "An error occurred. Please try again.";
        }
    };

    searchButton.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        dictionary(searchInput.value);
    });

    searchInput.addEventListener("keypress", function(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            event.preventDefault();
            dictionary(searchInput.value);
        }
    });
});
