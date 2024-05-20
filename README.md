
## Getting Started
Clone the repository:

    ```bash
    git clone https://github.com/jLillebror/campaign-companion-backend.git
    cd campaign-companion-backend
    ```

 Restore dependencies:

    ```bash
    dotnet restore
    ```

 Set up the database:

    - Open SQL Server Management Studio (SSMS).
    - Connect to your SQL Server instance.

Update the connection string in `appsettings.json`:

    ```json
    {
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft.AspNetCore": "Warning"
        }
      },
      "AllowedHosts": "*",
      "ConnectionStrings": {
        "CampaignCompanionContext": "Server=YOUR_SERVER_NAME;Database=CampaignCompanionDb;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False"
      }
    }
    ```

    Replace `YOUR_SERVER_NAME` with the name of your SQL Server instance.


For the backend, navigate to https://github.com/jLillebror/campaign-companion-backend and download it.


Open the terminal and install Next JS,

```bash
npm install next

npm install -g next
```
Run Command Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to test the web application.

You need to log in to use the functions that the application offers.
To keep it simple for this assignment, the username is 'user' and password is 'password'.

