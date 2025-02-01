/*
  The following Code was used to scrape research data from
  https://suryanshkumar.github.io/publications.html
*/
const pubs = Array.from(
  document.querySelectorAll(
    "#content > div:nth-child(5) > div > div.panel-body .publication-item .publication-description"
  )
)
  .map((ele) => {
    const data = ele.innerText.split("] ")[1]?.split("\n");
    const year = "20" + ele.innerText.split("] ")[0]?.split(" ")[1];
    if (!data) return "";
    const links = Array.from(ele.querySelectorAll("a")).map((a) => {
      return {
        text: a.innerText,
        link: a.href,
      };
    });
    const res = {
      title: data[0],
      authors: data[1].split(": ")[1],
      publication: (data[data.length - 3][0] == "*")?data[data.length - 4]:data[data.length - 3],
      topics:
        data[data.length - 1]
          .split(":")[1]
          ?.split(", ")
          .map((e) => {
            e = e.trim();
            if (e[e.length - 1] == ".") return e.substring(0, e.length - 1);
            return e;
          }) || [],
      year: year,
    };
    for (const a of links) {
        switch (a.text) {
            case "Project Website":
                res.project = a.link;
                break;
            case "PDF":
                res.paper = a.link;
                break;
            case "PDF (Presentation)":
                res.presentation = a.link;
                break;
            case "Supplementary":
                res.supplementary = a.link;
                break;
            case "Video":
                res.video = a.link;
                break;
        }
    }
    return res;
  })
  .filter((pub) => pub.year >= "2021");

let obj = {};

for (const pub of pubs) {
  if (pub.year in obj) {
    obj[pub.year].push(pub);
  } else {
    obj[pub.year] = [pub];
  }
}
