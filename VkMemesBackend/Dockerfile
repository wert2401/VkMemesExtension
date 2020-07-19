FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app
EXPOSE 80

COPY ./*.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 
WORKDIR /app
COPY --from=build /app/out .
COPY ./memes.db .
ENTRYPOINT ["dotnet", "VkMemesBackend.dll"]