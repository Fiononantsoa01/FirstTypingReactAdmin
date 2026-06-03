
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

 
ReferenceField génère un appel HTTP GET vers l'endpoint de la
ressource référencée. Par exemple :
GET http://localhost:3002/employees?id=1&id=2
React-admin regroupe toutes les références en un seul appel
pour optimiser les performances.



ReferenceField affiche le texte défini dans la prop `emptyText`
si elle est définie, sinon il affiche une cellule vide.
Aucune erreur n'est levée dans l'interface.

---

#
La méthode HTTP POST est émise vers l'endpoint :
POST http://localhost:3002/interns
Le corps de la requête contient toutes les données du formulaire
au format JSON.


On utilise useWatch de react-hook-form pour surveiller en temps
réel la valeur du champ isPaid. Quand isPaid est true, le champ
amount devient visible et obligatoire. useWatch est nécessaire
car il permet de lire la valeur d'un champ du formulaire depuis
un composant enfant sans avoir à remonter l'état manuellement.

---


ReferenceField est un composant déclaratif qui gère automatiquement
le chargement et le rendu d'une ressource liée. Il est idéal pour
un affichage simple dans une liste ou une page Show.

useGetOne est un hook bas niveau qui permet de charger une ressource
depuis n'importe quel composant, avec un contrôle total sur les
états isPending, error et data. On le préfère quand on a besoin
de logique custom, comme dans ManagerCard où on affiche une carte
avec mise en forme personnalisée.


Sans l'option enabled, useGetOne envoie immédiatement une requête
GET /employees/undefined qui retourne une erreur 404.
L'option { enabled: !!intern?.managerId } empêche l'appel tant
que l'id n'est pas disponible, évitant ainsi l'erreur.

---


ReferenceManyField est un composant déclaratif qui fonctionne
uniquement dans un contexte Show ou Edit avec une relation directe
définie dans le schéma. Il gère automatiquement le rendu.

useGetList est un hook bas niveau indispensable quand on a besoin
de logique custom : afficher un total, appliquer des filtres
dynamiques, ou afficher les données hors d'un contexte
react-admin standard comme dans InternsByManager.


On utilise pagination: { page: 1, perPage: 1 }.
json-server retourne le total dans le header X-Total-Count
même avec un seul enregistrement chargé. On récupère ainsi
le total sans charger tous les employés, ce qui réduit
la quantité de données transférées et améliore les performances.

---


useUpdate utilise la méthode HTTP PUT par défaut.
Pour forcer PATCH, il faut configurer le dataProvider
pour utiliser PATCH au lieu de PUT dans la méthode update.


previousData est nécessaire pour deux raisons :
1. Il permet à react-admin de calculer le diff entre
   l'ancienne et la nouvelle valeur.
2. Il est indispensable pour le mécanisme d'undo (annulation).
   Sans lui, react-admin ne sait pas quel était l'état précédent
   et lève une erreur lors de la mutation.

---

*Question 11.1 : Différence entre useCreate et le composant Create ?**

useCreate est un hook bas niveau qui envoie une requête POST
depuis n'importe quel composant sans changer de page.
Il donne un contrôle total sur la soumission et les callbacks
onSuccess et onError.

Le composant Create est une page dédiée avec formulaire,
gestion automatique de la redirection, du titre et des
notifications. On utilise useCreate quand on veut créer
sans quitter la vue courante, comme dans une modale.


On utilise le hook useRefresh() de react-admin dans le
callback onSuccess de useCreate. Il force le rechargement
de la liste courante après la création réussie, sans
avoir à naviguer vers une autre page.

---


Les 4 appels useGetList se font en parallèle. React effectue
tous les appels simultanément au montage du composant Dashboard,
car ce sont des hooks indépendants sans dépendance entre eux.
Cela optimise le temps de chargement du dashboard.


On a besoin uniquement du total retourné dans le header
X-Total-Count, pas des données elles-mêmes. Avec perPage: 1
on charge un seul enregistrement au lieu de 100, ce qui :
- Réduit la quantité de données transférées
- Accélère les requêtes
- Réduit la consommation mémoire