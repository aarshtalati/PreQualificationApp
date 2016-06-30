# Pre Qualification App


This is Angualr JS based application trying to keep a good balance b/w Single Page Application architecture with ASP.NET being in charge as well.

URL : http://prequalificationapp.azurewebsites.net

Technologies Used :

- .NET 4.5.2
- ASP.NET MVC
- Nuget
- Azure
- AngularJS
- HTML 5
- CSS 3
- Bootstrap
- toastr
- font-awesome
- ( Jasmine unit test )

## Installation
- Download or clone repo and open the project ( run Visual Studio as admin )
- Make sure you have latest version of Nuget
- Restore Nuget Packages ( [Read more](http://docs.nuget.org/consume/package-restore/msbuild-integrated/ "Nuget Docs") )
    - Open Nuget Package Manager and it should promt you to restore packages
    - Update packages if you want
    - `Update-Package -reinstall` might help
- Run with / without debugging

## Tools used
- Visual Studio 2013 Premium
- Web Browsers
- fiddler
- Azure app

## Reflection

The application uses external APIs to GET and POST data. The idea is that a consumer can check if (s)he qualifies for the loan in advance. The application was developeed under 2 hrs.



## Difficulties

The experience was smooth mostly. During finalizing and beautifying the look and feel, it was noticed that Nuget did not download older version of toastr as AngualrJS 
