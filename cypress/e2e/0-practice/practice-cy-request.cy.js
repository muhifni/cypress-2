describe("Practice using cy.request()", () => {
  it("TechnoApp Login POST", () => {
    cy.request({
      method: "POST",
      url: "https://technoapp.berijalan.id/login-proses",
      headers: {
        Host: "technoapp.berijalan.id",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryg29ZdKkpUYxA7GoP",
        Cookie:
          "XSRF-TOKEN=eyJpdiI6IlZEc1prUlp6R3JIbW5TOVBYVGxrTXc9PSIsInZhbHVlIjoiUjBwZis1U1d0Q1FjMG9hMzZsT1ZRTlJTQ0VqVUlRdDF6emN4WWF5NW16L04vZWRSSERHcEhoNFp4bElkdVlHY1ZORmRMM3Zad1ZIL24zbmtkTkJtZ0t4ckhQTVBZdjIrMUxBTERiMFBVWXNaV3BTcC9pM3djS0MvQ3Nmc2VIZWgiLCJtYWMiOiJhNWRkOWVkYThhYWUyMDQyN2YwMTQ1NDI1YTQ3NTgyYTBmMDE5YmM4N2QzODQyZWYzNjc2OTUwMmNhZDlkNjUwIiwidGFnIjoiIn0%3D; hcsystem_session=eyJpdiI6IlpvSmhqM3ZxYjJMMzV0clNFeXNwM1E9PSIsInZhbHVlIjoiYmV2Z2o3NXFzQzRkZjNkMGlmZnZLSmxCeUJiSzZFNnArenhoT2twN21WWFFuUitMZVdkTE1ISkE0eWxVaHFXSElyaXQ2VWdJSXFwNHJleWh2UUk4aStPeHl5TzlkUlhkdE02RU1qY1ZYSkNxRkoxN08rYWhBUzQ5YTVwb3pldWUiLCJtYWMiOiJmNzJmZjMxOThjM2QzZTAzOGRhZDM4OGNiYjU0MjI5ZjNjMjE3OWI5YmFlYWQyNGY0NTE4MTkzNmI5MDRiNzA3IiwidGFnIjoiIn0%3D",
        Origin: "https://technoapp.berijalan.id",
      },
      body: {
        _token: "jane",
        email: Cypress.env("email_hifni"),
        password: Cypress.env("pass_hifni"),
      },
    }).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property("_token", "jane"); // true

      console.log(response);
    });
  });

  it("TechnoApp Login POST v2", () => {
    cy.request({
      method: "POST",
      url: "https://technoapp.berijalan.id/login-proses",
      headers: {
        Host: "technoapp.berijalan.id",
        Cookie:
          "XSRF-TOKEN=eyJpdiI6IlZEc1prUlp6R3JIbW5TOVBYVGxrTXc9PSIsInZhbHVlIjoiUjBwZis1U1d0Q1FjMG9hMzZsT1ZRTlJTQ0VqVUlRdDF6emN4WWF5NW16L04vZWRSSERHcEhoNFp4bElkdVlHY1ZORmRMM3Zad1ZIL24zbmtkTkJtZ0t4ckhQTVBZdjIrMUxBTERiMFBVWXNaV3BTcC9pM3djS0MvQ3Nmc2VIZWgiLCJtYWMiOiJhNWRkOWVkYThhYWUyMDQyN2YwMTQ1NDI1YTQ3NTgyYTBmMDE5YmM4N2QzODQyZWYzNjc2OTUwMmNhZDlkNjUwIiwidGFnIjoiIn0%3D; hcsystem_session=eyJpdiI6IlpvSmhqM3ZxYjJMMzV0clNFeXNwM1E9PSIsInZhbHVlIjoiYmV2Z2o3NXFzQzRkZjNkMGlmZnZLSmxCeUJiSzZFNnArenhoT2twN21WWFFuUitMZVdkTE1ISkE0eWxVaHFXSElyaXQ2VWdJSXFwNHJleWh2UUk4aStPeHl5TzlkUlhkdE02RU1qY1ZYSkNxRkoxN08rYWhBUzQ5YTVwb3pldWUiLCJtYWMiOiJmNzJmZjMxOThjM2QzZTAzOGRhZDM4OGNiYjU0MjI5ZjNjMjE3OWI5YmFlYWQyNGY0NTE4MTkzNmI5MDRiNzA3IiwidGFnIjoiIn0%3D",
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": '"Not/A)Brand";v="8", "Chromium";v="126"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Accept-Language": "en-US",
        "Upgrade-Insecure-Requests": "1",
        Origin: "https://technoapp.berijalan.id",
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundaryg29ZdKkpUYxA7GoP",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.57 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        Referer: "https://technoapp.berijalan.id/login",
        "Accept-Encoding": "gzip, deflate, br",
      },
    }).then((response) => {
      // Handle response
    });
  });
});
