
Question 1.1 : Que représente le dataProvider dans React-Admin ? Quel est son rôle ?

Le dataProvider est l'adaptateur entre React-Admin et l'API REST.
Il traduit chaque action CRUD de l'interface en requête HTTP :
- Afficher la liste → GET /employees
- Créer un employé → POST /employees
- Modifier un employé → PUT /employees/:id
- Supprimer un employé → DELETE /employees/:id

Sans dataProvider, React-Admin ne sait pas comment communiquer avec l'API.

Question 1.2 : Quelle requête HTTP est envoyée au chargement de la liste 

GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=10


Question 2.1 : Que fait la prop rowClick="edit" sur le Datagrid ?

Elle redirige automatiquement vers le formulaire de modification
de l'employé quand on clique sur une ligne du tableau.

Question 2.2 : Passez perPage à 2. Que se passe-t-il dans l'interface ?

Seuls 2 employés s'affichent par page. La pagination se divise
en plusieurs pages. React-Admin envoie une nouvelle requête HTTP
avec les paramètres _start=0&_end=2 pour récupérer uniquement
les 2 premiers employés.



Question 3.1 : Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?

Un message d'erreur "Champ obligatoire" apparaît sous le champ
prénom. La soumission est bloquée et aucune requête HTTP n'est
envoyée à l'API.

Question 3.2 : Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?

Un message d'erreur "Doit être supérieur ou égal à 1500" apparaît
sous le champ salaire. La soumission est bloquée tant que la valeur
n'est pas corrigée.



Question 4.1 : Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?

La méthode HTTP utilisée est PUT.
Exemple : PUT http://localhost:3002/employees/1
Le corps de la requête contient toutes les données modifiées de l'employé.

Question 4.2 : À quel moment useRecordContext() est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?

useRecordContext() est disponible uniquement à l'intérieur d'un
composant enfant de <Edit> ou <Show>, après que les données ont
été chargées depuis l'API.
Si l'enregistrement n'est pas encore chargé, il retourne undefined.
C'est pourquoi on vérifie toujours : if (!record) return null.



Question 5.1 : Quelle différence y a-t-il entre SimpleShowLayout et TabbedShowLayout ?

- SimpleShowLayout affiche tous les champs dans une seule colonne
  verticale, de façon simple et linéaire. Idéal quand il y a peu
  de champs.

- TabbedShowLayout organise les champs en plusieurs onglets.
  Utile quand il y a beaucoup de champs à regrouper par catégorie
  pour améliorer la lisibilité.

  Question 6.1
  Le ReferenceField genère 
GET http://localhost:3002/employees?id=1&id=2
Question 6.2 
un message s'affiche si le manager ne correspond à aucun employé