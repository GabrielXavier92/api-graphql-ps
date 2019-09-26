import * as SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const sendEmail = async (recipient: string, url: string) => {
	if (process.env.NODE_ENV !== "test") {
		await client.transmissions
			.send({
				options: {
					sandbox: false
				},
				content: {
					from: "no-reply@iclinic.com",
					subject: "Confirm Email",
					html: `<html>
              <body>
                <p>Fala cmg Vitaaaaaaaaaao</p>
                <a href="${url}">Click on link to confirm email</a>
              </body>
            </html>`
				},
				recipients: [{ address: recipient }]
			})
			.then((data: any) => {
				console.log("Woohoo! You just sent your first mailing!");
				console.log(data);
			})
			.catch((err: any) => {
				console.log("Whoops! Something went wrong");
				console.log(err);
			});
	}
};
