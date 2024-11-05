// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-playground",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "eu-north-1",
      providers: {
        aws: {
          profile: input.stage === "production" ? "tidya-production" : "tidya-dev"
        }
      }
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb");
  },
});
