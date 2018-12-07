@ECHO off
IF "%1" == "" GOTO ERROR
IF "%2" == "" GOTO ERROR

./node_modules/.bin/mocha --require @babel/register -- src/days/%1/%2.spec.js
GOTO END

:ERROR
ECHO ERROR: Test not called in correct format.
ECHO npm test ^<day^> ^<file^>

:END