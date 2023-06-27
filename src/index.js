fetch('http://localhost:3000/quotes?_embed=likes')
      .then(response => response.json())
      .then(quotes => {
        quotes.forEach(quote => addQuoteToPage(quote));
      });

function addQuoteToPage(quote) {
      const quoteList = document.getElementById('quote-list');

      const li = document.createElement('li');
      li.className = 'quote-card';

      const blockquote = document.createElement('blockquote');
      blockquote.className = 'blockquote';

      const p = document.createElement('p');
      p.className = 'mb-0';
      p.textContent = quote.text;

      const footer = document.createElement('footer');
      footer.className = 'blockquote-footer';
      footer.textContent = quote.author;

      const br = document.createElement('br');

      const likeButton = document.createElement('button');
      likeButton.className = 'btn-success';
      likeButton.textContent = 'Likes: ';
      const likeCount = document.createElement('span');
      likeCount.textContent = quote.likes.length;
      likeButton.appendChild(likeCount);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn-danger';
      deleteButton.textContent = 'Delete';

      blockquote.appendChild(p);
      blockquote.appendChild(footer);
      blockquote.appendChild(br);
      blockquote.appendChild(likeButton);
      blockquote.appendChild(deleteButton);

      li.appendChild(blockquote);
      quoteList.appendChild(li);

      
      deleteButton.addEventListener('click', () => {
        deleteQuote(quote.id, li);
      });

      likeButton.addEventListener('click', () => {
        createLike(quote.id, likeCount);
      });
    }


    function deleteQuote(quoteId, listItem) {
      fetch(`http://localhost:3000/quotes/${quoteId}`, { method: 'DELETE' })
        .then(() => {
          listItem.remove();
        });
    }

   
    function createLike(quoteId, likeCount) {
      fetch(`http://localhost:3000/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quoteId: quoteId })
      })
        .then(response => response.json())
        .then(like => {
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
        });
    }

    const newQuoteForm = document.getElementById('new-quote-form');
    newQuoteForm.addEventListener('submit', event => {
      event.preventDefault();

      const quoteText = document.getElementById('quote-text').value;
      const author = document.getElementById('author').value;

      fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: quoteText, author: author })
      })
        .then(response => response.json())
        .then(quote => {
          addQuoteToPage(quote);
          newQuoteForm.reset();
        });
    });