# Visual and Spatial AI Lab Website

This codebase belongs to the visual and spatial gradient lab in Texas A&M University, College Station.

## Running a local version of the codebase
If you simple open the files in a browser, you will run into the issue of data not loading. This is because the browser is not allowed by default to access all the files on your computer as a security precaution. **I recommend you keep it that way if you don't know what you're doing.**

So to properly run the site. You'll need to run a live server in the given folder.
**I prefer using the VSCode extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).**
If you are not using VS Code, then I recommend using the deafult server in python. By running the following commands in your terminal or powershell or cmd.

```
    cd {PATH_TO_THE_SITE_FOLDER}/Lab
    python -m http.server
```

After running this you'll have the codebase running on [localhost:8000](localhost:8000) by default. For more details see, [https://docs.python.org/3.4/library/http.server.html](https://docs.python.org/3.4/library/http.server.html).

## Adding new research papers

Refer to the ```./data/research.json``` and add your research paper details in the following format, in the correct section and year. It will show with all the required filtering features.
### For Conference Proceedings
```
    {
        "title" : "Stereo Risk: A Continuous Modeling Approach to Stereo Matching",
        "authors" : "Ce Liu, Suryansh Kumar, Shuhang Gu, Radu Timofte, Yao Yao, Luc Van Gool",
        "publication" : "International Conference on Machine Learning (ICML), PMLR, 2024",
        "paper" : "https://openreview.net/forum?id=Mfk6ZbD6eY",
        "code" : "https://openreview.net/forum?id=Mfk6ZbD6eY",
        "project" : "", 
        "topics" : [
            "3D Acquisition",
            "Computer Vision",
            "Stereo Matching"
        ]   
    }
```
### For Journal Publications
```
    {
        "title" : "Spatio-Temporal Union of Subspaces for Multi-body Non-rigid Structure-from-Motion",
        "authors" : "Suryansh Kumar, Yuchao Dai, Hongdong Li",
        "publication" : "Elsevier Pattern Recognition Journal (PR),2017",
        "paper" : "https://www.sciencedirect.com/science/article/abs/pii/S0031320317302029",
        "impact" : "7.19"
    }
```

## Adding new videos to the highlight carousel

Add the required video the ```./videos``` folder to maintain consistency. Add the relevant metadata for the video to the ```./data/carousel.json``` in the following format.
```
    {
        "video" : "./videos/icra-24.mp4",
        "title" : "ICGNet: A Unified Approach for Instance-Centric Grasping",
        "description" : "ICRA 2024",
        "link" : "https://icgraspnet.github.io/"
    }
```

## Adding new news items for the index page
Refer to the ```./data/news.json``` and add news details in the following format.
```
    ...
    {
        "title" : "Visual and Spatial Gradient Lab Inaugarated",
        "summary" : "The Visual and Spatial Gradient Lab, part of the PVFA at Texas A&M University (TAMU) and led by Professor Suryansh Kumar, has been inaugurated.",
        "date" : "Jan 2025",
        "link" : "./index.html"
    }
    ...
```


## Adding people, FAQs etc

All of these should be done in the relevant ```.html``` file.
