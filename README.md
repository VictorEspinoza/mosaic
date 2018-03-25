# mosaic

> project to demonstrate how I work and more importantly how I think and solve tasks

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# tests
npm test

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Test strategy
Since I realized the app itself is really simple. I realized that prepare some serious test it would take
definitely more time than to create the app. So I decided to rather describe the testing strategy to cover 
the application or some other app with similar architecture. 

#API
There're just two api calls in the app. The first one is to load all images for the user. The second one is
used when user decides to upload an generated image. We should test definitely the existence of the API end points.
If we call correct ones and also test the format or signature of JSON object sent in case when user uploads an image. 

#State
I used an vue/vuex stack. The VUEX is just state store for the app. It contains only two actions one for getting the 
images and the second for uploading a new image.  We can test the moment when these action are called in components.
Images are loaded on mount event of the images.vue component  and upload of an image is trigger by clicking on 'upload' 
button. 

#Components
Apart of the calls of actions we can test few thing which actually makes sense, e.g. in case of images.vue component
we should test if in was succesfully loaded. In case of the transformation-chamber.vue compoenent. We should test 
the internal logic in the component. Which is: 
- button to upload an image is displayed on after a new image is actually generated.
- it is not allowed to make an new image from already processed image. The button to generate a new image is hidden

#Transformation helper
It is a standalone utility to generate a image from the source image chosen by user. In it we can test
the calculation of a hexadecimal color representation or results when calculating number of rows and columns.

##Places for improvement

#Authorization token
I generated access token which is one month valid. It definitely requires mechanism to generate new access token
in case the old one is already expired. Then it should also be considered in testing part of the app. 

#Add posibility to remove a generated image
I know it's just simple app for demonstration purposes only, but such functionality would make sense. 

#Bug
I wasn't able to fix a bug. When user creates a new image I send the base64data on IMGUR API, but for some reason
I haven't found out. The send data contain only a part of the generated image. 

#Paging
In case that the count of images would be too high. It would make the app more user friendly and the IMGUR API 
support such a functionality.

#Caching
I tried to generate a mosaic from a high resolution image or I tried to use a smaller circle to create a mosaci.
The process started to be really slow so the thing to improve it would be cache already generated images in case user
tries to generate some image twice or more times. 

#Refactoring
I used some ugly hardcoded string on some place and it would be nice to put it into separte file. Also some 
things should be nicely parametrized. Like number of images per page(in case of implementation of paging, size of a circle
to create a mosaic etc.)
