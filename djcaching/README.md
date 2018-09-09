

### About
Djcaching is a Django project that contains a custom middleware that caches a list of URLs
from the settings file.


#### Prerequisites
Before running this application, ensure that you have installed
* Python v>=3.5
* Pip installer


#### Installation
1. Copy the project, djcaching, to any directory of your choice.

2. Navigate to the root directory (djcaching) containing the manage.py file in a command line.

3. Install dependencies
    ```
   $ pip install -r requirements.txt
   ``` 

 
4. Run the migrate command in a shell to create the database tables automatically.
   ```
   $ python manage.py migrate 
   ``` 
   
   
5. Execute the runserver command in a shell to start the development server.This will enable you to access
   the web aplication in a browser.
   ```
   $ python manage.py runserver
   ```


   
6. Copy the following url in a browser
   
   http://localhost:8000/
   
   NB: The development server runs on port 8000 by default  

#### Running tests
In a terminal navigate to the root directory of the project containing the manage.py file, 
then run the following command in a shell:  
  ```
  $ python manage.py test 
  ``` 
