$(document).ready(function () {
  fetch("./data/carousel.json")
    .then((rawData) =>
      rawData
        .json()
        .then((data) => {
          const n = data.length;
          const indicatorHolder = document.querySelector(
            "#video-carousel .carousel-indicators"
          );
          const itemsHolder = document.querySelector(
            "#video-carousel .carousel-inner"
          );

          indicatorHolder.innerHTML = "";
          itemsHolder.innerHTML = "";

          for (let i = 0; i < n; i++) {
            const project = data[i];

            if (i == 0) {
              indicatorHolder.innerHTML += `<li data-target="#video-carousel" data-slide-to="${i}" class="active"></li>`;

              itemsHolder.innerHTML += `<div class="item active">
                            <a target="0" href="${project.link}"><video class="img-responsive center-block" muted autoplay>
                                <source src="${project.video}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="carousel-overlay">
                                <h2>${project.title}</h2>
                                <hr>
                                <h4>${project.description}</h4>
                            </div></a>
                        </div>`;
            } else {
              indicatorHolder.innerHTML += `<li data-target="#video-carousel" data-slide-to="${i}"></li>`;
              itemsHolder.innerHTML += `<div class="item">
                            <a target="0" href="${project.link}"><video class="img-responsive center-block" muted autoplay>
                                <source src="${project.video}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="carousel-overlay">
                                <h2>${project.title}</h2>
                                <hr>
                                <h4>${project.description}</h4>
                            </div></a>
                        </div>`;
            }
          }
        })
        .catch((e) => console.error)
    )
    .catch((e) => console.error);

  $("#video-carousel video").each(function () {
    this.pause();
  });

  $("#video-carousel").on("slide.bs.carousel", function (e) {
    var currentVideo = $(e.relatedTarget)
      .siblings(".active")
      .find("video")
      .get(0);
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0; // Reset video
    }

    var nextVideo = $(e.relatedTarget).find("video").get(0);
    if (nextVideo) {
      nextVideo.currentTime = 0; // Reset video
      nextVideo?.play();
    }
  });

  $("#video-carousel").find(".item.active video").get(0)?.play();
});
