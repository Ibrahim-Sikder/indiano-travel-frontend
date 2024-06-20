export const joditConfig = {
  uploader: {
    // insertImageAsBase64URI: false,
    url: "http://localhost:5000/api/v1/uploads",
    format: "json",
    prepareData: function (data: any) {
      return data;
    },
    isSuccess: (resp: any) => !resp.error,
    process: (resp: any) => {
      return {
        files: [resp.data.location] || [],
        path: resp.data.location,
        error: resp.error,
        msg: resp.msg,
      };
    },
    defaultHandlerSuccess: function (data: any, resp: any) {
      const files = data.files || [];
      if (files.length) {
        //@ts-ignore
        this.selection.insertImage(files[0], null, 250);
      }
    },
  },
  height: 500,
};
