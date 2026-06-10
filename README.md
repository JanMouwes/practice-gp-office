## Development


### Build & run dev container image on port 3000
```shell
docker build --target dev -t gp-practice-dev-img --file Dockerfile.dev .
```

```shell
docker run --rm -p 3000:4200\
 --mount type=bind,src=./web/client/,dst=/usr/local/app\
 --name gp-practice-dev gp-practice-dev-img
```

## Tests

### Build & run test container image
```shell
docker build --target test -t gp-practice-test-img --file Dockerfile.dev .
```

```shell
docker run --rm --name gp-practice-test gp-practice-test-img
```

```shell
# watch mode
docker run --rm --name gp-practice-test gp-practice-test-img --watch
```