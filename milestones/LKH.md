# Milestones
Landon Harris

## Chrome Extension Tutorials
### Completed
Implement the basic chrome extension tutorial. This includes the basic
popup, backround manager, options page, and manifest. 

I have completed the chrome tutorial with some changes and additional
research to better fit our application

## Read Webpage Content
### Not started
A function of various other password managers is being able to find the 
username and password field in the login form of various webpages. This 
task, although seemingly simple, will require research into the basic 
structure of webpages and login forms and how we can capture the input
from these two fields upon submission. 

## Store/Read Username/Password in accessible datastructure
### Not started
302 and 140 have focused on various datastructures and their implementation; 
as such, this milestone will focus on choosing the correct datastructure
to store a username/password pair, likely keyed on the website name. 
The difficulty with this milestone will be implementing it in javascript, 
a language that we are not as comfortable in when it comes to the 
minutia of intricate datastructures. 

## Encrypt/decrypt datastructure into local file
### Not Started
Although none of us have taken any cryptography classes, there are plenty of 
resources and libraries that are available that provide symmetric encryption
functions. As this is something that, if done incorrectly, could
defeat the purpose of this project, it will require at least a basic 
understanding of the function we decide to use. We also will need to find
a way to store the data in the datastructure in a contiguous file before
the  encryption takes place

## Autofill Username/password pair into webpages
### Not Started
This will require performing a 'find' operation on the chosen datastructure
after decryption which may take additional work. We also will have to do 
research into how to set the values of DOM elements (although this should
be easy after we figure out how to read them from the second milestone)
