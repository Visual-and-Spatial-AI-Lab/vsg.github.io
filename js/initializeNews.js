$(document).ready(function () {
  fetch("./data/news.json")
    .then((rawData) =>
      rawData
        .json()
        .then((data) => {
          const n = data.length;
          const itemsHolder = document.querySelector(
            "#news-holder"
          );

          itemsHolder.innerHTML = "";

          for (let i = 0; i < n; i++) {
            const news = data[i];

            itemsHolder.innerHTML += `<li style="margin-bottom: 7px">
                        <a href="${news.link}"><b>${news.title}</b></a><br/>
                        ${news.summary}
                        <div class="text-secondary" style="margin-top: 2px"><b>${news.date}</b></div> 
                    </li>`;
          }
        })
        .catch((e) => console.error)
    )
    .catch((e) => console.error);
});
