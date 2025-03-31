const renderAlumniSection = (data, title) => {
  const titleRender = `<div class="section-header-mini">${title}</div>`;
  let dataRender = "<ul>";

  if (window.location.pathname == "/index.html") {
    data = data.sort((a, b) => Date(a.Defended) > Date(b.Defended)).slice(0, 5);
  }

  for (student of data) {
    dataRender += `<li style="margin-inline-start: 4px;">
                <b>${student.name}</b> 
                <span class="alumni-now">(now <b>${student.position}</b> at <b>${student.company}</b>)</span><br/>
                <span class="alumni-thesis">${student.thesis}</span>
                <span class="alumni-defense">(Defended: ${student.Defended})</span> 
            </li>`;
  }

  dataRender += "</ul>";

  return titleRender + dataRender
}

const renderPastStudents = (data) => {
  const alumniSection = document.querySelector("#alumni-holder");
  alumniSection.innerHTML += renderAlumniSection(data["PhD"], "PhD");
  alumniSection.innerHTML += renderAlumniSection(data["MS"], "MS");
  alumniSection.innerHTML += renderAlumniSection(data["BS"], "BS");
}

$(document).ready(function () {
  fetch("./data/past_students.json")
    .then((rawData) =>
      rawData
        .json()
        .then(renderPastStudents)
        .catch((e) => console.error)
    )
    .catch((e) => console.error);
});