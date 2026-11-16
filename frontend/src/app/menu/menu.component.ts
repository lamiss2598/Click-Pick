import { Component,OnInit} from '@angular/core';
import{Menu} from './menu.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [{
    id: 1,
    nom: "Pizza Margherita",
    description: "Sauce tomate, mozzarella fraîche et basilic.",
    prix: 18,
    restaurantId: 1,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600"
  },
  {
    id: 2,
    nom: "Pizza 4 Fromages",
    description: "Mozzarella, parmesan, gorgonzola et chèvre.",
    prix: 26,
    restaurantId: 1,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600"
  },
  {
    id: 3,
    nom: "Pasta Carbonara",
    description: "Pâtes crémeuses, parmesan et sauce carbonara.",
    prix: 24,
    restaurantId: 1,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600"
  },

  // URBAN FOOD - ID 2
  {
    id: 4,
    nom: "Classic Burger",
    description: "Steak grillé, cheddar, salade et sauce maison.",
    prix: 16,
    restaurantId: 2,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 5,
    nom: "Double Cheese Burger",
    description: "Double steak, double cheddar et sauce spéciale.",
    prix: 23,
    restaurantId: 2,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600"
  },
  {
    id: 6,
    nom: "Chicken Sandwich",
    description: "Poulet croustillant, salade et sauce crémeuse.",
    prix: 14,
    restaurantId: 2,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600"
  },

  // SUSHI HOUSE - ID 3
  {
    id: 7,
    nom: "Sushi Saumon",
    description: "Riz japonais et saumon frais.",
    prix: 22,
    restaurantId: 3,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600"
  },
  {
    id: 8,
    nom: "California Rolls",
    description: "Saumon, avocat et graines de sésame.",
    prix: 28,
    restaurantId: 3,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600"
  },
  {
    id: 9,
    nom: "Maki Avocat",
    description: "Riz japonais, avocat et algue nori.",
    prix: 19,
    restaurantId: 3,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600"
  },

  // LE GOURMET - ID 4
  {
    id: 10,
    nom: "Couscous Tunisien",
    description: "Semoule, légumes frais et viande mijotée.",
    prix: 25,
    restaurantId: 4,
    image: "assets/menu_img/couscous.jpg"
  },
  {
    id: 11,
    nom: "Ojja Merguez",
    description: "Œufs, merguez, tomates et poivrons.",
    prix: 18,
    restaurantId: 4,
    image: "assets/menu_img/ojja_merguez.avif"
  },
  {
    id: 12,
    nom: "Brik à l'œuf",
    description: "Feuille croustillante garnie de thon et d'œuf.",
    prix: 8,
    restaurantId: 4,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600"
  },

  // TACOS FACTORY - ID 5
  {
    id: 13,
    nom: "Tacos Poulet",
    description: "Poulet mariné, frites, fromage et sauce fromagère.",
    prix: 16,
    restaurantId: 5,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600"
  },
  {
    id: 14,
    nom: "Tacos Mixte",
    description: "Poulet, viande hachée, fromage et sauce maison.",
    prix: 21,
    restaurantId: 5,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600"
  },
  {
    id: 15,
    nom: "Tenders Box",
    description: "Tenders croustillants, frites et sauce barbecue.",
    prix: 19,
    restaurantId: 5,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600"
  },

  // GREEN GARDEN - ID 6
  {
    id: 16,
    nom: "Chicken Salad",
    description: "Poulet grillé, laitue, tomates et avocat.",
    prix: 18,
    restaurantId: 6,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
  },
  {
    id: 17,
    nom: "Healthy Bowl",
    description: "Quinoa, légumes frais, avocat et graines.",
    prix: 22,
    restaurantId: 6,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600"
  },
  {
    id: 18,
    nom: "Salade César",
    description: "Salade romaine, poulet, parmesan et croûtons.",
    prix: 20,
    restaurantId: 6,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600"
  },

  // SWEET CORNER - ID 7
  {
    id: 19,
    nom: "Pancakes",
    description: "Pancakes moelleux, fruits et sirop d'érable.",
    prix: 15,
    restaurantId: 7,
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600"
  },
  {
    id: 20,
    nom: "Chocolate Waffle",
    description: "Gaufre chaude, chocolat et fruits frais.",
    prix: 17,
    restaurantId: 7,
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600"
  },
  {
    id: 21,
    nom: "Cheesecake",
    description: "Cheesecake crémeux avec coulis de fruits rouges.",
    prix: 13,
    restaurantId: 7,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600"
  },

  // GRILL HOUSE - ID 8
  {
    id: 22,
    nom: "Steak Grillé",
    description: "Steak grillé accompagné de légumes et de frites.",
    prix: 32,
    restaurantId: 8,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600"
  },
  {
    id: 23,
    nom: "Brochettes de Poulet",
    description: "Brochettes marinées et grillées avec accompagnement.",
    prix: 24,
    restaurantId: 8,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600"
  },
  {
    id: 24,
    nom: "Mixed Grill",
    description: "Assortiment de viandes grillées et légumes.",
    prix: 38,
    restaurantId: 8,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600"
  },
  {
    id: 25,
    nom: "Cappuccino",
    description: "Espresso, lait chaud et mousse de lait.",
    prix: 7,
    restaurantId: 9,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600"
  },
  {
    id: 26,
    nom: "Iced Coffee",
    description: "Café glacé avec du lait et des glaçons.",
    prix: 9,
    restaurantId: 9,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
  },
  {
    id: 27,
    nom: "Chocolate Cake",
    description: "Gâteau au chocolat avec une crème onctueuse.",
    prix: 12,
    restaurantId: 9,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
  },

  // COFFEE LAB - ID 10
  {
    id: 28,
    nom: "Latte Macchiato",
    description: "Espresso délicat avec du lait crémeux.",
    prix: 8,
    restaurantId: 10,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600"
  },
  {
    id: 29,
    nom: "Mocha",
    description: "Mélange de café espresso, lait et chocolat.",
    prix: 10,
    restaurantId: 10,
    image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d8f?w=600"
  },
  {
    id: 30,
    nom: "Cheesecake",
    description: "Cheesecake crémeux avec un coulis de fruits rouges.",
    prix: 13,
    restaurantId: 10,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600"
  },

  // LE PATIO CAFE - ID 11
  {
    id: 31,
    nom: "Petit Déjeuner",
    description: "Café, jus frais, tartines et viennoiseries.",
    prix: 18,
    restaurantId: 11,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600"
  },
  {
    id: 32,
    nom: "Croissant",
    description: "Croissant au beurre, croustillant et frais.",
    prix: 4,
    restaurantId: 11,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600"
  },
  {
    id: 33,
    nom: "Jus d'Orange",
    description: "Jus d'orange frais préparé à la commande.",
    prix: 6,
    restaurantId: 11,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
  }
];
  menusRestaurant: Menu[] = [];
  restaurantId?:number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.restaurantId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.menusRestaurant = this.menus.filter(
      menu => menu.restaurantId === this.restaurantId
    );
  }
  
  dateSelectionnee: string = new Date().toISOString().split('T')[0];

  creneaux = [
    { heure: '12:00', places: 0 },
    { heure: '12:30', places: 3 },
    { heure: '13:00', places: 0 },
    { heure: '13:30', places: 5 },
    { heure: '14:00', places: 8 },
    { heure: '14:30', places: 4 },
    { heure: '15:00', places: 6 },
    { heure: '15:30', places: 2 }
  ];

  heureSelectionnee: string = '';

  choisirHeure(heure: string, places: number) {
    if (places > 0) {
      this.heureSelectionnee = heure;
    }
  }
  

panier: (Menu & { quantite: number })[] = [];

ajouterAuPanier(menu: Menu) {

  const produitExiste = this.panier.find(
    item => item.id === menu.id
  );

  if (produitExiste) {
    
    produitExiste.quantite++;
  } else {
    
    this.panier.push({
      ...menu,
      quantite: 1
    });
  }
}

augmenter(item: Menu & { quantite: number }) {
  item.quantite++;
}
diminuer(item: Menu & { quantite: number }) {
  item.quantite--;

  if (item.quantite === 0) {
    this.panier = this.panier.filter(
      produit => produit.id !== item.id
    );
  }
}


get totalPanier(): number {
  return this.panier.reduce(
    (total, item) => total + item.prix * item.quantite,
    0
  );
}
validerCommande() {

  if (this.panier.length === 0) {
    return;
  }

  if (!this.heureSelectionnee) {
    alert("Veuillez choisir un créneau de retrait.");
    return;
  }

  const commande = {
    restaurantId: this.restaurantId,
    dateRetrait: this.dateSelectionnee,
    heureRetrait: this.heureSelectionnee,
    produits: this.panier.map(item => ({
      menuId: item.id,
      quantite: item.quantite
    })),
    total: this.totalPanier
  };

  console.log("Commande validée :", commande);

  alert("Votre commande a été validée avec succès !");

  // Vider le panier après validation
  this.panier = [];
  this.heureSelectionnee = '';
}
}
