# Trip Cost Calculator

## About

This is a simple app that takes the amount each individual spent on a trip and determines who owes whom how much to split the costs evenly.

It consists of a simple React frontend and a C#/.NET Web API backend.

### API

The API is a straightforward .NET Web API written in C#. Documentation is available via a Swagger OpenAPI interface when running the API in development mode.

#### Prerequisites

Before running the API, the .NET 8 SDK must be installed.

#### Running

Run the API as you would any other .NET project, using either your IDE of choice or the command line as outlined below.

From the /TripCostCalculatorApi/ directory:

- `dotnet restore`
- `dotnet run --project TripCostCalculatorApi`

#### Testing

Run tests as you would with any other .NET project, using either your IDE of choice or the command line as outlined below.

From the /TripCostCalculatorApi/ directory:

- `dotnet restore`
- `dotnet test`

### Website

The website is a straightforward React app built with the Remix framework.

#### Prerequisites

Before running the app, nodeJS >= 18 must be installed. The app has been developed and tested against nodeJS 22.3.0.

If you use the `asdf` version manager with the `nodejs` plugin, version 22.3.0 will automatically be selected for you based on the .tool-versions file.

#### Running

TODO

#### Testing

TODO
