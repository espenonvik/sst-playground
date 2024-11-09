export default $config({
  app(input) {
    return {
      name: "sst-playground",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "eu-north-1",
      providers: {
        aws: {
          profile:
            input.stage === "production" ? "tidya-production" : "tidya-dev",
        },
      },
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("MyTable", {
      fields: {
        userId: "string",
        noteId: "string",
      },
      primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
    });

    new sst.aws.Nextjs("MyWeb", {
      link: [table],
    });
  },
});
