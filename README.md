
```shell
docker build -t <image_name> .
docker run -d -p 3000:4200 -v $(pwd):/test-docker --name <container_name> <image_name>
```

## Development

### Build dev container image
```shell
docker build -t gp-website-dev-1 .
```

### Run dev container on port 3000 
```shell
docker run --rm -i -p 3000:4200 --name gp-practice-dev gp-website-dev-1
```

