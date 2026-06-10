## Development

### Build dev container image
```shell
docker build -t gp-practice-dev-img Dockerfile.dev
```

### Run dev container on port 3000 
```shell
docker run --rm -p 3000:4200\
 --mount type=bind,src=./web/client/,dst=/usr/local/app\
 --name gp-practice-dev gp-practice-dev-img
```

### Template incl. volume
```shell
docker build -t <image_name> Dockerfile.dev
docker run -d -p 3000:4200 -v $(pwd):/test-docker --name <container_name> <image_name>
```
