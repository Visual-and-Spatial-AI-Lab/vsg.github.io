document.addEventListener("DOMContentLoaded", () => {
  fetch("data/research.json")
    .then((data) => {
      data
        .json()
        .then((publications) => {
          // Render Available Selections
          const papers = publications["Peer-Reviewed Conference Proceedings"];
          let topics = new Map();

          const years = Object.keys(papers).sort().reverse();
          for (const year of years) {
            for (const paper of papers[year]) {
              for (const topic of paper.topics) {
                if (topics.has(topic)) {
                  topics.set(topic, topics.get(topic) + 1);
                } else {
                  topics.set(topic, 1);
                }
              }
            }
          }

          let sortedTopics = Array.from(topics.entries()).sort(
            (a, b) => b[1] - a[1]
          );

          const topicsSection = document.querySelector("#filter-topics");
          topicsSection.innerHTML = `<b>By Topic</b>: <a id="All" class="filter" onclick="click_show('All'); return false;">All</a> . `;
          for (const [topic, count] of sortedTopics) {
            const id = topic.split(" ").join("_");
            topicsSection.innerHTML += `<a id="${id}" class="filter" onclick="click_show('${topic}'); return false;">${topic}</a> . `;
          }

          // Render papers
          const papersListHolder = document.querySelector("#papers-list");
          for (const year of years) {
            papersListHolder.innerHTML += `<h3><b class=\"text-primary year-header\">${year}</b></h3>`;
            for (const paper of papers[year]) {
              papersListHolder.innerHTML += `<b>${paper.title}</b>
                <br>${paper.authors}
                <br> <em>${paper.publication}</em>
                <br> 
                  ${
                    paper.paper ? `[ <a href="${paper.paper}">paper</a> ]` : ""
                  } 
                  ${
                    paper.supplementary
                      ? `[ <a href="${paper.supplementary}">video</a> ]`
                      : ""
                  }
                  ${
                    paper.presentation
                      ? `[ <a href="${paper.presentation}">video</a> ]`
                      : ""
                  }
                  ${paper.code ? `[ <a href="${paper.code}">code</a> ]` : ""}
                  ${
                    paper.project
                      ? `[ <a href="${paper.project}">project</a> ]`
                      : ""
                  }
                  ${paper.video ? `[ <a href="${paper.video}">video</a> ]` : ""}
                <br><br>`;
            }
          }

          const journalPapers = publications["Peer-Reviewed Journals"];

          const journalPaperHolder = document.querySelector(
            "#journal-papers-list"
          );
          for (const paper of journalPapers) {
            journalPaperHolder.innerHTML += `<b>${paper.title}</b>
              <br>${paper.authors}
              <br> <em>${paper.publication}</em>
              <br> <b style="color: #500">Impact Score : ${paper.impact}</b>
              <br> 
                ${paper.paper ? `[ <a href="${paper.paper}">paper</a> ]` : ""} 
              <br><br>`;
          }

          document.dispatchEvent(new Event("page-init"));
        })
        .catch((e) => console.error);
    })
    .catch((e) => console.error);
});

const click_show = (topic) => {
  // Reset All filters design
  const filters = document.getElementsByClassName("filter");
  for (const filter of filters) filter.style = orig_style;

  const id = topic.split(" ").join("_");
  const element = document.getElementById(id);
  element.style.backgroundColor = "#500";
  element.style.color = "#fff";
  element.style.fontWeight = "bold";
  element.style.padding = "2px";

  fetch("data/research.json")
    .then((data) => {
      data
        .json()
        .then((publications) => {
          const papers = publications["Peer-Reviewed Conference Proceedings"];
          const years = Object.keys(papers).sort().reverse();

          // Render papers
          const papersListHolder = document.querySelector("#papers-list");
          papersListHolder.innerHTML = "";
          for (const year of years) {
            papersListHolder.innerHTML += `<h3><b class=\"text-primary year-header\">${year}</b></h3>`;
            for (const paper of papers[year]) {
              if (topic != "All" && !paper.topics.includes(topic)) continue;
              papersListHolder.innerHTML += `<b>${paper.title}</b>
                  <br>${paper.authors}
                  <br> <em>${paper.publication}</em>
                  <br> 
                    ${
                      paper.paper
                        ? `[ <a href="${paper.paper}">paper</a> ]`
                        : ""
                    } 
                    ${paper.code ? `[ <a href="${paper.code}">code</a> ]` : ""}
                    ${
                      paper.project
                        ? `[ <a href="${paper.project}">project</a> ]`
                        : ""
                    }
                  <br><br>`;
            }
          }
        })
        .catch((e) => console.error);
    })
    .catch((e) => console.error);
};

document.addEventListener("page-init", () => {
  orig_style = document.getElementById("All");
  click_show("All");
});
