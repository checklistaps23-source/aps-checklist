import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHxMNER21e2Hb65R2qXWaYRhKrjN8zJaU",
  authDomain: "check-list-peremption.firebaseapp.com",
  projectId: "check-list-peremption",
  storageBucket: "check-list-peremption.firebasestorage.app",
  messagingSenderId: "20359103251",
  appId: "1:20359103251:web:c52af261ee73613aa4d0e6",
  measurementId: "G-RVGW7JMXLH"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function fbGet(key) {
  try {
    const snap = await getDoc(doc(db, "aps_data", key));
    return snap.exists() ? snap.data().value : null;
  } catch { return null; }
}
async function fbSet(key, value) {
  try {
    await setDoc(doc(db, "aps_data", key), { value });
  } catch(e) { console.error("Firebase set error", e); }
}
function fbListen(key, callback) {
  return onSnapshot(doc(db, "aps_data", key), (snap) => {
    if (snap.exists()) callback(snap.data().value);
  });
}
const C={bg:"#0b1120",panel:"#111827",border:"#1f2f4a",accent:"#f97316",accentSoft:"rgba(249,115,22,0.1)",text:"#f0f4ff",muted:"#4d6a8a",success:"#22c55e",successSoft:"rgba(34,197,94,0.12)",danger:"#ef4444",dangerSoft:"rgba(239,68,68,0.1)",warning:"#f59e0b",blue:"#38bdf8",red:"#dc2626",darkBlue:"#1d4ed8"};
const GS=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'); *{box-sizing:border-box;} button{cursor:pointer;font-family:inherit;} input,textarea,select{font-family:inherit;} input::placeholder{color:#4d6a8a;}`;
const isExpired=(d)=>{if(!d)return false;const t=new Date();t.setHours(0,0,0,0);return new Date(d)<t;};

function ConfirmDialog({message,onConfirm,onCancel}){
return(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
<div style={{background:"#111827",border:"1px solid #1f2f4a",borderRadius:16,padding:"24px",maxWidth:320,width:"100%"}}>
<div style={{fontSize:15,fontWeight:600,color:"#f0f4ff",marginBottom:20,textAlign:"center",lineHeight:1.5}}>{message}</div>
<div style={{display:"flex",gap:10}}>
<button onClick={onCancel} style={{flex:1,background:"transparent",border:"1px solid #1f2f4a",borderRadius:10,color:"#4d6a8a",padding:"12px",fontWeight:700,fontSize:14}}>Annuler</button>
<button onClick={onConfirm} style={{flex:1,background:"#ef4444",border:"none",borderRadius:10,color:"white",padding:"12px",fontWeight:700,fontSize:14}}>Supprimer</button>
</div>
</div>
</div>
);
}
const ADMIN_PWD="aps.ckeckremlist";
const STORAGE_KEY="aps_checklists_v1";

const CHECKLISTS={
"ALPHA 1":{edition:"12/2025",norme:"ATNUP",sections:[
{id:1,label:"Soins et oxygénothérapie",color:C.red,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Set de pansement",q:1,p:true},{n:"Rouleau de sparadrap",q:2},{n:"Couverture Isotherme",q:5},{n:"Bandage triangulaire + épingle",q:4},{n:"Esculape",q:1}]},
{id:"B",label:"Étagère B",items:[{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Compresse 10x10cm",q:10,p:true},{n:"Compresse absorbante 20x10cm",q:5,p:true},{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Iso-Bétadine® dermique 10%",q:5,p:true},{n:"Champ stérile 90x70",q:4,p:true},{n:"Kit pansement autocollant",q:1}]},
{id:"C",label:"Étagère C",items:[{n:"Bandage élastique 5 ou 7cm",q:5,p:true},{n:"Bandage élastique 10cm",q:5,p:true},{n:"Bandage élastique 15cm",q:4,p:true},{n:"Cool Pack",q:5}]},
{id:"D",label:"Oxygénothérapie Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"E",label:"Oxygénothérapie Enfant",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true}]},
{id:"F",label:"Aspiration",items:[{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1},{n:"Bassin réniforme UU",q:10},{n:"Sac vomitoire",q:5}]},
]},
{id:2,label:"Paramétrage",color:C.darkBlue,shelves:[{id:"A",label:"",items:[
{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancettes",q:10},{n:"Tigettes",q:10,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Pile AA / AAA",q:8},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1},
]}]},
{id:3,label:"Divers",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Couverture anti feu",q:1}]}]},
{id:4,label:"Eau potable",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Bouteille d'eau potable 50cl",q:6,p:true}]}]},
{id:5,label:"Hygiène — Spray",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Spray désinfectant surface",q:2,p:true}]}]},
{id:7,label:"Hygiène",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Spray désodorisant citron",q:1},{n:"Rouleau sac poubelle ambulance",q:1},{n:"Sac à linge jaune",q:2},{n:"Sac à linge blanc",q:2},{n:"Alèze UU",q:2},{n:"Lange adulte",q:3},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Microfibres",q:4}]}]},
{id:8,label:"Ballon REA et canules",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Ballon REA adulte complet UU",q:1,p:true},{n:"Masque pour ballon N°4",q:1,p:true},{n:"Masque pour ballon N°5",q:1,p:true},{n:"Filtre antibactérien ballon REA",q:1,p:true},{n:"Set de 9 canules de T000 à T5",q:1}]}]},
{id:9,label:"RDOH",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Pane",q:1},{n:"Urinal",q:1}]}]},
{id:10,label:"Kits Burning",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit Burning",q:1,s:true,p:true}]}]},
{id:11,label:"Kit de protection individuel",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95/FFP2",q:5}]}]},
{id:12,label:"Kit de rechange brancard",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3}]}]},
{id:13,label:"Cabine sanitaire",color:C.red,shelves:[
{id:"A",label:"Cabine sanitaire",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:2,p:true},{n:"Sonde d'aspiration CH 8",q:3,p:true},{n:"Sonde d'aspiration CH 12",q:3,p:true},{n:"Sonde d'aspiration CH 14",q:3,p:true},{n:"Aspirateur de mucosité",q:1,t:true},{n:"Appareil multi paramétrage",q:1,t:true},{n:"Oxylog",q:1,t:true},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Sac d'Intervention",q:1,s:true,p:true},{n:"DEA + Electrode",q:1,t:true,p:true},{n:"Electrode de réserve",q:1,p:true},{n:"Collier cervical adulte",q:1},{n:"Collier cervical pédiatrique",q:1}]},
{id:"B",label:"Cabine sanitaire suite",items:[{n:"Bouteille O² 2L",q:1,bar:true},{n:"Extincteur 6Kg",q:1,p:true},{n:"Planche Rollboard",q:1},{n:"Tarif TMS",q:1},{n:"Tablette support monitoring",q:1}]},
]},
{id:14,label:"Porte Extérieur — Traumatologie",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Matelas à dépression",q:1,t:true},{n:"Pompe pour matelas",q:1},{n:"Scoop",q:1,t:true},{n:"Planche d'Olivier",q:1},{n:"Chaise d'évacuation",q:1,t:true},{n:"KED",q:1},{n:"Head block complet",q:1},{n:"Sac d'atèle",q:1},{n:"Atèle grande",q:1,t:true},{n:"Atèle moyenne",q:1,t:true},{n:"Atèle petite",q:1,t:true},{n:"Pompe pour atèle",q:1},{n:"Marche pieds",q:1,t:true},{n:"Bouteille O² 2L",q:1,bar:true},{n:"Bouteille O² 10L",q:1,bar:true},{n:"Bouteille O² 10L (2)",q:1,bar:true}]}]},
{id:15,label:"Cabine chauffeur",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Lampe de pré signalisation",q:2,t:true},{n:"Coupe ceinture / Brise glace",q:1},{n:"Carte ADR",q:1},{n:"Carte Hainaut",q:1}]}]},
]},
"ALPHA 2":{edition:"12/2024",norme:"112/ATNUP",sections:[
{id:1,label:"Soin et Oxygénothérapie",color:C.red,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Compresse 10x10cm",q:10,p:true},{n:"Compresse absorbante 20x10cm",q:5,p:true},{n:"Bandage élastique 15cm",q:2,p:true},{n:"Bandage élastique 20cm",q:2,p:true},{n:"Rouleau de sparadrap 2cm",q:2}]},
{id:"B",label:"Étagère B",items:[{n:"Bandage triangulaire + épingle",q:4},{n:"Couverture Isotherme",q:5},{n:"Esculape",q:1},{n:"Kit pansement autocollant",q:1},{n:"Bandage élastique 5 ou 7cm",q:5,p:true},{n:"Bandage élastique 10cm",q:5,p:true},{n:"Champ stérile 90x71",q:4,p:true},{n:"Bande pansement autocollant",q:1}]},
{id:"C",label:"Étagère C",items:[{n:"Set de pansement",q:1,p:true},{n:"Rouleau Urgoderme",q:1},{n:"Bouchon fermeture robinet 3 voies",q:1,p:true},{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Bétadine® dermique 10%",q:5,p:true},{n:"Cold Pack",q:5}]},
{id:"D",label:"Oxygénothérapie Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"E",label:"Oxygénothérapie Enfant",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true}]},
{id:"F",label:"Divers",items:[{n:"Bassin réniforme UU",q:10},{n:"Sac vomitoire",q:5},{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1},{n:"Bouteille d'eau potable 50cl",q:6,p:true}]},
]},
{id:2,label:"Oxygénothérapie — Ballons",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Ballon REA adulte complet UU",q:1,p:true},{n:"Filtre antibactérien ballon REA",q:1,p:true},{n:"Set de 9 canules de T000 à T6",q:1}]}]},
{id:3,label:"Electrode DEA + Divers",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Electrode DEA réserve",q:1,p:true}]}]},
{id:4,label:"Kits: Linge brancard / Padding",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3},{n:"Kit Padding",q:1},{n:"Oreiller de réserve (lavable)",q:1}]}]},
{id:"6-8",label:"Matériel préventif",color:C.red,shelves:[{id:"A",label:"",items:[]}]},
{id:5,label:"Pochette paramétrage",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancette",q:10},{n:"Tigette",q:10,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Pile AA / AAA",q:8},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1},{n:"Détecteur CO",q:1,p:true}]}]},
{id:9,label:"Kits: Burning",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit Burning",q:1,s:true,p:true}]}]},
{id:10,label:"Set de perfusions",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Poche Sérum Physiologique 500ml",q:4,p:true},{n:"Trousse à perfusion",q:2,p:true},{n:"Cathéter 16G",q:2,p:true},{n:"Cathéter 18G",q:2,p:true},{n:"Cathéter 20G",q:2,p:true},{n:"Cathéter 22G",q:2,p:true},{n:"Tégaderme",q:2,p:true},{n:"Garrot",q:1},{n:"Gants stériles 6,5",q:2,p:true},{n:"Gants stériles 7,5",q:2,p:true},{n:"Gants stériles 8,5",q:2,p:true}]}]},
{id:13,label:"Hygiène",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Spray désinfectant surface",q:2,p:true},{n:"Spray désodorisant citron",q:1},{n:"Rouleau sac poubelle ambulance",q:1},{n:"Sac à linge blanc",q:2},{n:"Sac à linge jaune",q:2},{n:"Alèze UU",q:3},{n:"Lange adulte",q:3},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Microfibres",q:4},{n:"Mouchoir UU (boite)",q:1},{n:"Blouse d'opéré",q:1}]}]},
{id:15,label:"Aspirateur de mucosité",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Aspirateur de mucosité",q:1,t:true}]}]},
{id:16,label:"Sac: KATA et Pédiatrique",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Sac KATA (Rouge)",q:1,s:true,p:true},{n:"Sac Pédia./Accou.(bleu)",q:1,s:true,p:true}]}]},
{id:17,label:"Matelas à dépression",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Matelas à dépression",q:1,t:true},{n:"Pompe pour matelas",q:1}]}]},
{id:18,label:"RDOH / Kit protection / Speed Block",color:C.red,shelves:[
{id:"A",label:"RDOH",items:[{n:"Pane",q:1},{n:"Urinal",q:1}]},
{id:"B",label:"Kit de protection individuelle",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95 / FFP3",q:5}]},
{id:"C",label:"Kit Speed Block",items:[{n:"Kit Speed Block",q:1}]},
]},
{id:19,label:"Oxygène",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Bouteille O² 10L",q:1,bar:true},{n:"Bouteille O² 10L (2)",q:1,bar:true},{n:"Bouteille O² 2L",q:1,bar:true}]}]},
{id:20,label:"Cabine sanitaire",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:1,p:true},{n:"Sonde d'aspiration CH 6 ou 8",q:3,p:true},{n:"Sonde d'aspiration CH 10 ou 12",q:2,p:true},{n:"Sonde d'aspiration CH 14 ou 16",q:2,p:true},{n:"Appareil multi paramétrage",q:1,t:true},{n:"Tarif ATNUP",q:1},{n:"Couverture anti feu",q:1},{n:"Planche d'Olivier + base Speed Block",q:1},{n:"Collier cervical adulte",q:1},{n:"Collier cervical pédiatrique",q:1},{n:"Gant nitrile taille S (boite)",q:1},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Container à aiguille",q:1},{n:"Tensiomètre mural",q:1},{n:"Ciseau multifonctions d'urgence",q:1},{n:"Sac Intervention + DEA",q:1,t:true,p:true}]}]},
{id:21,label:"Porte Ext. Arrière — Traumatologie",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Scoop",q:1,t:true},{n:"Chaise d'évacuation",q:1,t:true},{n:"Sac d'atèle",q:1},{n:"Atèle grande",q:1,t:true},{n:"Atèle moyenne",q:1,t:true},{n:"Atèle petite",q:1,t:true},{n:"Pompe (pour atèle)",q:1,t:true},{n:"Bouteille O² 2L",q:1,bar:true},{n:"Sangle araignée",q:1},{n:"KED",q:1,t:true},{n:"Marche pieds",q:1,t:true},{n:"Extincteur 6Kg",q:1,p:true},{n:"Corde semi statique",q:1},{n:"Pelle pliable (US)",q:1},{n:"Gant de sécurité",q:1},{n:"Pied de biche",q:1}]}]},
{id:22,label:"Cabine chauffeur",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Casque",q:2},{n:"Lampe pour casque",q:2,t:true},{n:"Coupe ceinture",q:1},{n:"Brise vitre",q:1},{n:"Carte routière Hainaut",q:1},{n:"Carte ADR",q:1}]}]},
]},
"ALPHA 3":{edition:"07/2025",norme:"112/ATNUP",sections:[
{id:1,label:"Soin et Oxygénothérapie",color:C.red,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Set de pansement",q:1,p:true},{n:"Rouleau de sparadrap",q:2},{n:"Couverture Isotherme",q:5},{n:"Bandage triangulaire + épingle",q:4},{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Compresse 10x10cm",q:10,p:true},{n:"Compresse absorbante 20x10cm",q:5,p:true},{n:"Bandage élastique 5 ou 7cm",q:5,p:true}]},
{id:"B",label:"Étagère B",items:[{n:"Bandage élastique 10cm",q:5,p:true},{n:"Bandage élastique 15cm ou 20cm",q:5},{n:"Rouleau Urgoderme",q:1},{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Iso-Bétadine® dermique 10%",q:5,p:true},{n:"Champ stérile 90x69",q:4,p:true},{n:"Kit pansement autocollant",q:1},{n:"Bande pansement autocollant",q:1}]},
{id:"C",label:"Oxygénothérapie Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"D",label:"Oxygénothérapie Enfant",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true},{n:"Bouchon fermeture robinet 3 voies",q:3,p:true},{n:"Bassin réniforme UU",q:10},{n:"Sac vomitoire",q:5},{n:"Container à aiguille",q:1}]},
{id:"E",label:"Ballons REA",items:[{n:"Ballon REA adulte complet UU",q:1,p:true},{n:"Masque pour ballon N°4",q:1,p:true},{n:"Masque pour ballon N°5",q:1,p:true},{n:"Filtre antibactérien ballon REA",q:1,p:true},{n:"Set de 9 canules de T000 à T5",q:1}]},
{id:"F",label:"Divers",items:[{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1},{n:"Cool Pack",q:5}]},
]},
{id:2,label:"Divers",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Manchette à pression",q:1},{n:"Bouteille d'eau potable 50cl",q:6,p:true}]}]},
{id:3,label:"Pochette paramétrage",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancette",q:10},{n:"Tigettes",q:10,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Pile AA / AAA",q:8},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1},{n:"Détecteur CO",q:1,p:true}]}]},
{id:4,label:"Set de perfusions",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Poche Sérum Physiologique 500ml",q:4,p:true},{n:"Trousse à perfusion",q:2,p:true},{n:"Cathéter 16G",q:2,p:true},{n:"Cathéter 18G",q:2,p:true},{n:"Cathéter 20G",q:2,p:true},{n:"Cathéter 22G",q:2,p:true},{n:"Tégaderme",q:2,p:true},{n:"Garrot",q:1},{n:"Gants stériles 6,5",q:2,p:true},{n:"Gants stériles 7,5",q:2,p:true},{n:"Gants stériles 8,5",q:2,p:true}]}]},
{id:5,label:"Kit de protection individuelle",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95 / FFP2",q:5}]}]},
{id:6,label:"Kits Burning",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit Burning",q:1,s:true,p:true}]}]},
{id:"7-8",label:"Kits: Linge brancard / Padding",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3},{n:"Kit Padding",q:1}]}]},
{id:9,label:"Poubelle / Frigo",color:C.darkBlue,shelves:[{id:"A",label:"",items:[]}]},
{id:11,label:"Sac KATA / Oreiller",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Oreiller lavable",q:1},{n:"Sac KATA",q:1,s:true,p:true}]}]},
{id:12,label:"Gant nitrile / Mouchoir UU",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Gant nitrile taille S (boite)",q:1},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Mouchoir UU (boite)",q:1}]}]},
{id:13,label:"Kit COVID Colliers cervicaux",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit COVID",q:1},{n:"Collier cervical adulte",q:1},{n:"Collier cervical pédiatrique",q:1}]}]},
{id:14,label:"Sac Intervention + DEA / Pédiatrique",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Sac d'Intervention",q:1,s:true,p:true},{n:"DEA + Electrode",q:1,t:true,p:true},{n:"Electrode de réserve",q:1,p:true},{n:"Sac Pédiatrique",q:2,s:true,p:true}]}]},
{id:15,label:"Hygiène",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Spray désinfectant surface",q:2,p:true},{n:"Spray désodorisant citron",q:2},{n:"Rouleau sac poubelle ambulance",q:1},{n:"Sac à linge blanc",q:2},{n:"Sac à linge jaune",q:2},{n:"Alèze UU",q:3},{n:"Lange adulte",q:3},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Microfibres",q:4}]}]},
{id:16,label:"RDOH",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Pane",q:1},{n:"Urinal",q:1}]}]},
{id:17,label:"Oxygène",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Bouteille O² 10L",q:1,bar:true},{n:"Bouteille O² 10L (2)",q:1,bar:true},{n:"Bouteille O² 2L",q:1,bar:true}]}]},
{id:18,label:"Cabine sanitaire",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:1,p:true},{n:"Sonde d'aspiration CH 8",q:3,p:true},{n:"Sonde d'aspiration CH 12",q:3,p:true},{n:"Sonde d'aspiration CH 14",q:3,p:true},{n:"Aspirateur de mucosité",q:1,t:true},{n:"Appareil multi paramétrage",q:1,t:true},{n:"Tarif TMS",q:1},{n:"Couverture anti feu",q:1}]}]},
{id:19,label:"Porte Ext. — Traumatologie",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Matelas à dépression",q:1,t:true},{n:"Pompe pour matelas",q:1},{n:"Scoop",q:1,t:true},{n:"Planche d'Olivier",q:1},{n:"Chaise d'évacuation",q:1,t:true},{n:"KED",q:1},{n:"Speed block complet",q:1},{n:"Sac d'atèle",q:1},{n:"Atèle grande",q:1,t:true},{n:"Atèle moyenne",q:1,t:true},{n:"Atèle petite",q:1,t:true},{n:"Pompe (pour atèle)",q:1,t:true},{n:"Sangle araignée",q:1},{n:"Marche pieds",q:1,t:true}]}]},
{id:20,label:"Porte Ext. Avant — Matériels divers",color:C.darkBlue,shelves:[
{id:"A",label:"Planche A",items:[{n:"Corde semi statique",q:1},{n:"Pelle pliable (US)",q:1},{n:"Casque",q:2},{n:"Lampe pour casque",q:2,t:true},{n:"Gant de sécurité",q:1},{n:"Pied de biche",q:1}]},
{id:"C",label:"Planche C + Extincteur",items:[{n:"Extincteur 6Kg",q:1,p:true},{n:"Bouteille O² 2L",q:1,bar:true}]},
]},
{id:"CC",label:"Cabine chauffeur",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Lampe de présignalisation",q:2,t:true},{n:"Coupe ceinture / Brise glace",q:1}]}]},
]},
"ALPHA 4":{edition:"09/2025",norme:"112/ATNUP",sections:[
{id:1,label:"Soin",color:C.red,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Bandage triangulaire + épingle",q:4},{n:"Couverture Isotherme",q:5},{n:"Esculape",q:1},{n:"Rouleau Urgoderme",q:1},{n:"Rouleau de sparadrap 2cm",q:2},{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Iso-Bétadine® dermique 10%",q:5,p:true},{n:"Cold Pack",q:5},{n:"Kit pansement autocollant",q:1}]},
{id:"B",label:"Étagère B",items:[{n:"Compresse 10x10cm",q:10,p:true},{n:"Compresse absorbante 20x10cm",q:5,p:true},{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Bandage élastique 5 ou 7cm",q:5,p:true},{n:"Bandage élastique 10cm",q:5,p:true}]},
{id:"C",label:"Étagère C",items:[{n:"Bandage élastique 15cm",q:2,p:true},{n:"Bandage élastique 20cm",q:2,p:true},{n:"Champ stérile 75x90cm",q:4,p:true}]},
]},
{id:2,label:"Oxygénothérapie",color:C.darkBlue,shelves:[
{id:"A",label:"Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"B",label:"Enfant",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true}]},
]},
{id:3,label:"BR, Sac vomitoir, Mouchoir UU",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Bassin réniforme UU",q:10},{n:"Sac vomitoire",q:5},{n:"Mouchoir UU (boite)",q:1}]}]},
{id:4,label:"Bouteille eau",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Bouteille d'eau potable 50cl",q:6,p:true}]}]},
{id:5,label:"Kit paramétrage / Kit Burning",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancette",q:10},{n:"Tigette",q:2,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Pile AA / AAA",q:8},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1},{n:"Kit Burning",q:1,s:true,p:true}]}]},
{id:7,label:"Kits Padding / Divers",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit Padding",q:1},{n:"Spray désinfectant surface",q:2,p:true},{n:"Oreiller de réserve (lavable)",q:1},{n:"Blouse d'opéré",q:1}]}]},
{id:8,label:"Set de perfusions",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Poche Sérum Physiologique 500ml",q:4,p:true},{n:"Trousse à perfusion",q:2,p:true},{n:"Cathéter 16G",q:2,p:true},{n:"Cathéter 18G",q:2,p:true},{n:"Cathéter 20G",q:2,p:true},{n:"Cathéter 22G",q:2,p:true},{n:"Tégaderme",q:2,p:true},{n:"Garrot",q:1},{n:"Gants stériles 6,5",q:2,p:true},{n:"Gants stériles 7,5",q:2,p:true},{n:"Gants stériles 8,5",q:2,p:true},{n:"Bouchon robinet 3 voies",q:3,p:true}]}]},
{id:9,label:"Kits: Linge brancard / Jeu d'Atèle",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3},{n:"Sac d'atèle",q:1},{n:"Atèle grande",q:1,t:true},{n:"Atèle moyenne",q:1,t:true},{n:"Atèle petite",q:1,t:true},{n:"Pompe (pour atèle)",q:1,t:true}]}]},
{id:10,label:"Hygiène",color:C.red,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Spray désodorisant citron",q:1},{n:"Rouleau sac poubelle ambulance",q:1},{n:"Sac à linge blanc",q:2},{n:"Sac à linge jaune",q:2},{n:"Alèze UU",q:3},{n:"Lange adulte",q:3},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Microfibres",q:4}]},
{id:"B",label:"Étagère B",items:[{n:"Ballon REA adulte complet UU",q:1,p:true},{n:"Masque ballon N°4",q:1,p:true},{n:"Masque ballon N°5",q:1,p:true},{n:"Filtre antibactérien ballon REA",q:1,p:true},{n:"Set de 8 canules de T000 à T5",q:1},{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1}]},
]},
{id:11,label:"Kit de protection individuel",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95 / FFP3",q:5}]}]},
{id:12,label:"Matelas à dépression",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Matelas à dépression",q:1,t:true},{n:"Pompe pour matelas",q:1}]}]},
{id:13,label:"RDOH",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Pane",q:1},{n:"Urinal",q:1}]}]},
{id:14,label:"Sac Intervention",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Sac Intervention",q:1,p:true},{n:"DEA + Electrodes",q:1,t:true,p:true},{n:"Electrodes de réserve",q:1,p:true},{n:"Détecteur CO",q:1,p:true},{n:"Ciseau multifonction d'URGENCE",q:1}]}]},
{id:15,label:"Sac: KATA et Pédiatrique",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Sac KATA (rouge)",q:1,s:true,p:true},{n:"Sac Pédia./Accou.(bleu)",q:1,s:true,p:true}]}]},
{id:16,label:"Scoop",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Scoop + 3 sangles velcro",q:1,t:true}]}]},
{id:17,label:"Porte Ext. Traumatologie / O²",color:C.darkBlue,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Planche d'Olivier",q:1},{n:"Chaise d'évacuation",q:1,t:true},{n:"Extincteur 6kg",q:1,t:true},{n:"Sangle araignée",q:1},{n:"KED",q:1,t:true}]},
{id:"B",label:"Étagère B",items:[{n:"Corde semi statique",q:1},{n:"Pelle pliable (US)",q:1},{n:"Pied de sécurité",q:1},{n:"Casque",q:2},{n:"Lampe pour casque",q:2,t:true},{n:"Kit Speed Block",q:1,t:true},{n:"Bouteille O² 10L",q:1,bar:true},{n:"Bouteille O² 10L (2)",q:1,bar:true},{n:"Bouteille O² 2L",q:1,bar:true},{n:"Marche pieds",q:1,t:true}]},
]},
{id:18,label:"Cabine sanitaire",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:1,p:true},{n:"Sonde d'aspiration CH 8",q:3,p:true},{n:"Sonde d'aspiration CH 12",q:3,p:true},{n:"Sonde d'aspiration CH 14",q:3,p:true},{n:"Appareil multi paramétrage",q:1,t:true},{n:"Aspirateur de mucosité",q:1,t:true},{n:"Gant nitrile taille S (boite)",q:1},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Container à aiguille",q:1},{n:"Poubelle",q:1},{n:"Tarif ATNUP",q:1},{n:"Couverture anti feu",q:1},{n:"Bouteille O² 2L",q:1,bar:true}]}]},
{id:19,label:"Cabine chauffeur",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Lampe de présignalisation",q:2,t:true},{n:"Coupe ceinture",q:1},{n:"Brise vitre",q:1},{n:"Carte routière Hainaut",q:1},{n:"Carte ADR",q:1}]}]},
]},
"ALPHA 5":{edition:"09/2025",norme:"112/ATNUP",sections:[
{id:1,label:"Container à aiguille",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Container à aiguille",q:1}]}]},
{id:2,label:"Bouteilles d'eau potable",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Bouteille d'eau potable 50cl",q:6,p:true}]}]},
{id:3,label:"Frigo",color:C.red,shelves:[{id:"A",label:"",items:[]}]},
{id:4,label:"Kits de linge brancard",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3}]}]},
{id:6,label:"Appareil multi paramétrage",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Appareil multi paramétrage",q:1,t:true}]}]},
{id:9,label:"Soin",color:C.darkBlue,shelves:[{id:"A",label:"Étagère A",items:[{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Iso-Bétadine® dermique 10%",q:5,p:true},{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Compresse 10x10cm",q:10,p:true},{n:"Esculape",q:1},{n:"Rouleau Urgoderme",q:1},{n:"Rouleau de sparadrap 2cm",q:2},{n:"Bandage élastique 5cm",q:5,p:true},{n:"Bandage élastique 7cm",q:5,p:true},{n:"Bandage élastique 10cm",q:5,p:true},{n:"Bandage élastique 15cm",q:4,p:true},{n:"Bandage triangulaire + épingle",q:4},{n:"Couverture Isotherme",q:5},{n:"Sac vomitoir",q:5},{n:"Cold Pack",q:5},{n:"Kit pansement autocollant",q:1},{n:"Compresse absorbante 20x10cm",q:5,p:true},{n:"Champ stérile 40x45cm",q:4,p:true}]}]},
{id:10,label:"Oxygénothérapie / Ballons",color:C.red,shelves:[
{id:"A",label:"Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"B",label:"Enfant",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true}]},
{id:"C",label:"Ballons REA",items:[{n:"Ballon REA adulte complet UU",q:1,p:true},{n:"Masque REA N°4 Rouge",q:1,p:true},{n:"Masque REA N°5 Bleu",q:1,p:true},{n:"Filtre antibactérien ballon REA",q:1,p:true},{n:"Set de 8 canules de T000 à T5",q:1}]},
]},
{id:11,label:"Set de perfusions",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Poche Sérum Physiologique 500ml",q:4,p:true},{n:"Trousse à perfusion",q:2,p:true},{n:"Cathéter 16G",q:2,p:true},{n:"Cathéter 18G",q:2,p:true},{n:"Cathéter 20G",q:2,p:true},{n:"Cathéter 22G",q:2,p:true},{n:"Tégaderme",q:2,p:true},{n:"Garrot",q:1},{n:"Gants stériles 6,5",q:2,p:true},{n:"Gants stériles 7,5",q:2,p:true},{n:"Gants stériles 8,5",q:2,p:true},{n:"Bouchon robinet 3 voies",q:4}]}]},
{id:12,label:"Kit padding",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit Padding 3 pièces",q:1}]}]},
{id:13,label:"Divers",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Bassin réniforme UU",q:10},{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1}]}]},
{id:14,label:"Kit d'atèles / Pochette paramétrage",color:C.red,shelves:[
{id:"A",label:"Atèles",items:[{n:"Sac d'attelle + pompe",q:1},{n:"Attelle grande",q:1,t:true},{n:"Attelle moyenne",q:1,t:true},{n:"Attelle petite",q:1,t:true}]},
{id:"B",label:"Paramétrage",items:[{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancette",q:5},{n:"Tigette minimum",q:10,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Sérum physiologique unidose",q:1,p:true},{n:"Pile AA / AAA",q:8},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1}]},
]},
{id:16,label:"Hygiène",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Spray désinfectant surface",q:2,p:true},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Spray désodorisant citron",q:1},{n:"Rouleau sac poubelle ambulance",q:2},{n:"Sac à linge blanc",q:2},{n:"Sac à linge jaune",q:2},{n:"Alèze UU",q:4},{n:"Lange adulte",q:3},{n:"Microfibres",q:4},{n:"Mouchoir UU (boite)",q:1},{n:"Blouse d'opéré",q:1}]}]},
{id:17,label:"Kit de protection individuel",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95 / FFP3",q:5}]}]},
{id:18,label:"RDOH",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Pane + 2 sacs récupérateurs UU",q:1},{n:"Urinal + 2 sacs récupérateurs UU",q:1},{n:"Oreiller de réserve (lavable)",q:1}]}]},
{id:19,label:"Cabine sanitaire",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:2,p:true},{n:"Sonde d'aspiration CH 8",q:3,p:true},{n:"Sonde d'aspiration CH 12",q:3,p:true},{n:"Sonde d'aspiration CH 14",q:3,p:true},{n:"Aspirateur de mucosité",q:1,t:true},{n:"Gant nitrile taille S (boite)",q:1},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Tarif ATNUP",q:1},{n:"Couverture anti feu",q:1},{n:"Brise vitre et coupe ceinture",q:1},{n:"Ciseau multifonction d'URGENCE",q:1},{n:"Sac Intervention",q:1,s:true,p:true},{n:"DEA + Electrodes",q:1,t:true,p:true},{n:"Electrodes de réserve",q:1,p:true},{n:"Détecteur CO",q:1,p:true}]}]},
{id:20,label:"Face arrière portes ouvertes",color:C.darkBlue,shelves:[
{id:"B",label:"",items:[{n:"Chaise d'évacuation",q:1,t:true}]},
{id:"C",label:"",items:[{n:"Sac Pédia. / Accou. (bleu)",q:1,s:true,p:true}]},
{id:"E",label:"",items:[{n:"Sac KATA (rouge)",q:1,s:true,p:true}]},
{id:"F",label:"",items:[{n:"Bouteille O² 2L",q:1,bar:true},{n:"Bouteille O² 2L (2)",q:1,bar:true}]},
]},
{id:21,label:"Porte Ext. Traumatologie / O²",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Scoop + 3 sangles velcro",q:1},{n:"Planche d'Olivier",q:1},{n:"KED",q:1,t:true},{n:"Matelas à dépression",q:1,t:true},{n:"Pompe pour matelas",q:1,t:true},{n:"Sangle araignée",q:1},{n:"Corde semi statique",q:1},{n:"Pelle pliable (US)",q:1},{n:"Gant de sécurité",q:1},{n:"Pied de biche",q:1},{n:"Kit HEAD Block",q:1},{n:"Bouteille O² 5L",q:1,bar:true},{n:"Bouteille O² 5L (2)",q:1,bar:true},{n:"Extincteur 6Kg",q:1,p:true},{n:"Marche pieds",q:1,t:true},{n:"Planche de transfert Rollbord®",q:1}]}]},
{id:22,label:"Cabine chauffeur",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Casque",q:2},{n:"Lampe pour casque",q:2,t:true},{n:"Lampe de présignalisation",q:2,t:true},{n:"Brise vitre / Coupe ceinture",q:1},{n:"Carte routière Hainaut",q:1},{n:"Carte ADR",q:1}]}]},
]},
"ALPHA 6":{edition:"09/2025",norme:"112/ATNUP",sections:[
{id:1,label:"Divers",color:C.red,shelves:[{id:"A",label:"",items:[]}]},
{id:2,label:"Soins et Oxygénothérapie",color:C.darkBlue,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Bandage élastique 5cm",q:5,p:true},{n:"Bandage élastique 7cm",q:5,p:true},{n:"Bandage élastique 10cm",q:5,p:true},{n:"Bandage élastique 15cm",q:5,p:true},{n:"Bandage élastique 20cm",q:2,p:true},{n:"Cold Pack",q:5},{n:"Pansement autocollant",q:1}]},
{id:"B",label:"Étagère B",items:[{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Iso-Bétadine® dermique 10%",q:5,p:true},{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Compresse 10x10cm",q:10,p:true},{n:"Esculape",q:1},{n:"Compresse absorbante 20x10cm",q:5,p:true},{n:"Rouleau Urgoderme",q:1},{n:"Rouleau de sparadrap 2cm",q:2},{n:"Bandage triangulaire + épingle",q:4},{n:"Couverture Isotherme",q:5}]},
{id:"C",label:"Étagère C",items:[{n:"Bassin réniforme UU",q:10},{n:"Sac vomitoire",q:5},{n:"Champ stérile 75x90cm",q:4,p:true}]},
{id:"D",label:"Oxygénothérapie Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"E",label:"Étagère E",items:[{n:"Set de 8 canules de T000 à T5",q:1}]},
{id:"EE",label:"Oxygénothérapie Enfant + Ballons REA",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true},{n:"Ballon REA adulte complet UU",q:1,p:true},{n:"Masque REA N°4 rouge",q:1,p:true},{n:"Masque REA N°5 bleu",q:1,p:true},{n:"Filtre antibactérien ballon REA",q:1,p:true}]},
{id:"F",label:"Étagère F",items:[{n:"Bouteille d'eau potable 50cl",q:6,p:true},{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1}]},
]},
{id:3,label:"Kits de linge brancard / Padding",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3},{n:"Kit Padding 3 pièces",q:1},{n:"Oreiller de réserve (lavable)",q:1}]}]},
{id:4,label:"Kit paramétrage",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancette",q:10},{n:"Tigette",q:10,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Sérum physiologique unidose",q:1,p:true},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1},{n:"Pile AA / AAA",q:8}]}]},
{id:5,label:"Set de perfusions",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Poche Sérum Physiologique 500ml",q:4,p:true},{n:"Trousse à perfusion",q:2,p:true},{n:"Cathéter 16G",q:2,p:true},{n:"Cathéter 18G",q:2,p:true},{n:"Cathéter 20G",q:2,p:true},{n:"Cathéter 22G",q:2,p:true},{n:"Tégaderme",q:2,p:true},{n:"Garrot",q:1},{n:"Gants stériles 6,5 ou S",q:2,p:true},{n:"Gants stériles 7,5 ou M",q:2,p:true},{n:"Gants stériles 8,5 ou L",q:2,p:true},{n:"Bouchon robinet 3 voies",q:3,p:true}]}]},
{id:6,label:"Kit de protection individuelle",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95 / FFP3",q:5}]}]},
{id:7,label:"Kit Burning",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit Burning",q:1,s:true,p:true}]}]},
{id:8,label:"RDOH",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Pane + 2 sacs UU",q:1},{n:"Urinal + 2 sacs UU",q:1}]}]},
{id:9,label:"Hygiène",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Spray désodorisant citron",q:1},{n:"Rouleau sac poubelle ambulance",q:1},{n:"Sac à linge blanc",q:2},{n:"Sac à linge jaune",q:2},{n:"Alèze UU",q:3},{n:"Lange adulte",q:3},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Microfibres",q:4},{n:"Spray désinfectant surface",q:2,p:true},{n:"Blouse d'opéré",q:1}]}]},
{id:13,label:"Gant nitrile / Mouchoir UU",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Gant nitrile taille S (boite)",q:1},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Mouchoir UU (boite)",q:1}]}]},
{id:15,label:"Sac Pédia. / Accou.",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Sac Pédia./Accou.(bleu)",q:1,s:true,p:true}]}]},
{id:16,label:"Sac Intervention + DEA / Sac KATA",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Sac Intervention",q:1,s:true,p:true},{n:"Détecteur CO",q:1,p:true},{n:"DEA + Electrodes",q:1,t:true,p:true},{n:"Electrodes de réserve",q:1,p:true},{n:"Ciseau multifonction d'URGENCE",q:1},{n:"Sac KATA (rouge)",q:1,s:true,p:true},{n:"Bouteille O² 2L",q:1,bar:true}]}]},
{id:17,label:"Cabine sanitaire",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:1,p:true},{n:"Sonde d'aspiration CH 8",q:3,p:true},{n:"Sonde d'aspiration CH 12",q:3,p:true},{n:"Sonde d'aspiration CH 14",q:3,p:true},{n:"Container à aiguille",q:1},{n:"Poubelle",q:1},{n:"Tarif ATNUP",q:1},{n:"Couverture anti feu",q:1},{n:"Ciseau multifonction d'URGENCE",q:1},{n:"Appareil multi paramétrage",q:1,t:true},{n:"Aspirateur de mucosité",q:1,t:true}]}]},
{id:18,label:"HEAD B-LOCK",color:C.darkBlue,shelves:[{id:"A",label:"Boite",items:[{n:"HEAD B-LOCK",q:1},{n:"Corde semi statique",q:1},{n:"Pelle pliable (US)",q:1},{n:"Gant de sécurité",q:1},{n:"Sangle araignée",q:1}]}]},
{id:19,label:"O² / Extincteur 6Kg",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Bouteille O² 10L",q:1,bar:true},{n:"Bouteille O² 10L (2)",q:1,bar:true},{n:"Bouteille O² 2L",q:1,bar:true},{n:"Extincteur 6Kg",q:1,p:true}]}]},
{id:20,label:"Porte Ext. Traumatologie",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Chaise d'évacuation",q:1,t:true},{n:"Matelas à dépression",q:1,t:true},{n:"Pompe pour matelas",q:1},{n:"KED",q:1},{n:"Sac d'atèle",q:1},{n:"Atèle grande",q:1,t:true},{n:"Atèle moyenne",q:1,t:true},{n:"Atèle petite",q:1,t:true},{n:"Pompe (pour atèle)",q:1,t:true},{n:"Scoop + 3 sangles velcro",q:1,t:true},{n:"Pied de biche",q:1}]}]},
{id:21,label:"Porte arrière",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Planche d'Olivier",q:1}]}]},
{id:22,label:"Cabine chauffeur",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Lampe de présignalisation",q:2,t:true},{n:"Brise vitre / Coupe ceinture",q:1},{n:"Carte routière Hainaut",q:1},{n:"Carte ADR",q:1},{n:"Casque",q:2},{n:"Lampe pour casque F2",q:2,t:true}]}]},
]},
"ALPHA 7":{edition:"Nov/2025",norme:"112/ATNUP",sections:[
{id:1,label:"Oxygénothérapie / Divers",color:C.red,shelves:[
{id:"A",label:"Étagère A — Ballons REA",items:[{n:"Ballon REA adulte complet UU4",q:1},{n:"Masque REA N°5",q:1},{n:"Filtre antibactérien ballon REA",q:1,p:true},{n:"Set de 8 canules de T000 à T5",q:1}]},
{id:"B",label:"Étagère B — Oxygénothérapie Adulte",items:[{n:"Masque O² 100% Adulte",q:1,p:true},{n:"Lunette O² Adulte",q:2,p:true},{n:"Masque aérosol Adulte",q:1,p:true},{n:"Tubulure + Raccord Biconique",q:1,p:true}]},
{id:"C",label:"Étagère C — Eau + Divers",items:[{n:"Bouteille d'eau potable 50cl",q:6,p:true},{n:"Sac récupérateur de mucosité",q:1},{n:"Tubulure aspirateur de mucosité",q:1}]},
{id:"D",label:"Étagère D — Oxygénothérapie Enfant",items:[{n:"Masque O² 100% Enfant",q:1,p:true},{n:"Lunette O² Enfant",q:2,p:true},{n:"Masque aérosol Enfant",q:1,p:true}]},
{id:"E",label:"Divers",items:[{n:"Bassin réniforme UU",q:10},{n:"Sac vomitoire",q:5}]},
]},
{id:2,label:"Soins",color:C.darkBlue,shelves:[
{id:"A",label:"Étagère A",items:[{n:"Solution désinfectante Hibidil®",q:10,p:true},{n:"Sérum physiologique unidose",q:10,p:true},{n:"Iso-Bétadine® dermique 10%",q:5,p:true},{n:"Compresse 5x5cm",q:10,p:true},{n:"Compresse 7,5x7,5cm",q:10,p:true},{n:"Compresse 10x10cm",q:10,p:true},{n:"Compresse absorbante 20x10cm",q:5,p:true}]},
{id:"B",label:"Étagère B",items:[{n:"Rouleau Urgoderme",q:1},{n:"Rouleau de sparadrap 2cm",q:2},{n:"Kit pansement autocollant",q:1},{n:"Bandage élastique 5cm",q:5,p:true},{n:"Esculape",q:1},{n:"Bandage élastique 7cm",q:5,p:true},{n:"Bandage élastique 10cm",q:5,p:true}]},
{id:"C",label:"Étagère C",items:[{n:"Bandage élastique 15cm",q:2,p:true},{n:"Bandage élastique 20cm",q:2,p:true},{n:"Champ stérile 75x90cm",q:4,p:true}]},
{id:"D",label:"Étagère D",items:[{n:"Bandage triangulaire + épingle",q:4},{n:"Couverture Isotherme",q:5},{n:"Cold Pack",q:5}]},
]},
{id:3,label:"Kits de linge brancard / Padding",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Kit de linge brancard",q:3},{n:"Kit Padding 3 pièces",q:1},{n:"Oreiller de réserve (lavable)",q:1}]}]},
{id:4,label:"Kit paramétrage",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Tensiomètre manuel",q:1,t:true},{n:"Stéthoscope",q:1,t:true},{n:"Pulsoxymètre filaire",q:1,t:true},{n:"Thermomètre auriculaire",q:1,t:true},{n:"Recharge d'embouts jetable",q:1},{n:"Thermomètre digitale",q:1,t:true},{n:"Glucomètre",q:1,t:true},{n:"Lancette",q:10},{n:"Tigette",q:10,p:true},{n:"Compresse 5x5cm",q:2,p:true},{n:"Sérum physiologique unidose",q:1,p:true},{n:"Lampe diagnostique",q:1},{n:"Marqueur indélébile",q:1},{n:"Pile AA / AAA",q:8}]}]},
{id:5,label:"Set de perfusions",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Poche Sérum Physiologique 500ml",q:4,p:true},{n:"Trousse à perfusion",q:2,p:true},{n:"Cathéter 16G",q:2,p:true},{n:"Cathéter 18G",q:2,p:true},{n:"Cathéter 20G",q:2,p:true},{n:"Cathéter 22G",q:2,p:true},{n:"Tégaderme",q:2,p:true},{n:"Garrot",q:1},{n:"Gants stériles 6,5 ou S",q:2,p:true},{n:"Gants stériles 7,5 ou M",q:2,p:true},{n:"Gants stériles 8,5 ou L",q:2,p:true},{n:"Bouchon robinet 3 voies",q:3,p:true}]}]},
{id:8,label:"Sac d'atèles",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Atèle grande",q:1,t:true},{n:"Atèle moyenne",q:1,t:true},{n:"Atèle petite",q:1,t:true},{n:"Pompe (pour atèle)",q:1,t:true}]}]},
{id:9,label:"Hygiène",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Spray désodorisant citron",q:1},{n:"Rouleau sac poubelle ambulance",q:1},{n:"Sac à linge blanc",q:2},{n:"Sac à linge jaune",q:2},{n:"Alèze UU",q:3},{n:"Lange adulte",q:3},{n:"Paquet de lingette désinfectante",q:1,p:true},{n:"Microfibres",q:1},{n:"Mouchoir UU (boite)",q:1},{n:"Blouse d'opéré",q:1},{n:"Spray désinfectant surface",q:2,p:true}]}]},
{id:10,label:"Sacs Pédia. / Accou. / KATA",color:C.darkBlue,shelves:[
{id:"A",label:"",items:[{n:"Sac KATA (rouge)",q:1,s:true,p:true},{n:"Sac Pédia./Accou.(bleu)",q:1,s:true,p:true}]},
{id:"B",label:"Boite",items:[{n:"Corde semi statique",q:1},{n:"Pelle pliable (US)",q:1},{n:"Gant de sécurité",q:1},{n:"Sangle araignée",q:1}]},
]},
{id:11,label:"Sac Intervention / O²",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Sac Intervention avec DEA",q:1,s:true,p:true},{n:"DEA",q:1,t:true,p:true},{n:"Electrode DEA réserve",q:1,p:true},{n:"Détecteur CO",q:1,p:true},{n:"Ciseau multifonction d'URGENCE",q:1},{n:"Bouteille O² 2L",q:1,bar:true},{n:"Pied de biche",q:1}]}]},
{id:12,label:"Cabine sanitaire",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Brancard avec sangles",q:1},{n:"Toile de glisse",q:1},{n:"Distributeur de papier UU",q:1},{n:"Gel hydroalcoolique",q:1,p:true},{n:"Sonde d'aspiration CH 8",q:3,p:true},{n:"Sonde d'aspiration CH 12",q:3,p:true},{n:"Sonde d'aspiration CH 14",q:3,p:true},{n:"Appareil multi paramétrage",q:1,t:true},{n:"Aspirateur de mucosité",q:1,t:true},{n:"Gant nitrile taille S (boite)",q:1},{n:"Gant nitrile taille M (boite)",q:1},{n:"Gant nitrile taille L (boite)",q:1},{n:"Gant nitrile taille XL (boite)",q:1},{n:"Container à aiguille",q:1},{n:"Poubelle",q:1},{n:"Tarif ATNUP",q:1},{n:"Couverture anti feu",q:1},{n:"Ciseau multifonction d'URGENCE",q:1}]}]},
{id:13,label:"Kit protec. Indiv. / HEAD B-LOCK",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Salopette UU",q:2},{n:"Blouse UU",q:2},{n:"Lunette de protection",q:2},{n:"Charlotte",q:2},{n:"Masque chirurgical",q:5},{n:"Masque KN95 / FFP3",q:5},{n:"HEAD B-LOCK",q:1}]}]},
{id:14,label:"RDOH / Kit Burning",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Pane + 2 sacs UU",q:1},{n:"Urinal + 2 sacs UU",q:1},{n:"Kit Burning",q:1,s:true,p:true}]}]},
{id:15,label:"O²",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Bouteille O² 2L",q:1,bar:true},{n:"Pompe à matelas à dépression",q:1}]}]},
{id:16,label:"Divers",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Matelas à dépression",q:1,t:true}]}]},
{id:17,label:"Porte Ext. Traumatologie",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Planche d'Olivier",q:1},{n:"Chaise d'évacuation",q:1,t:true},{n:"KED",q:1,t:true},{n:"Bouteille O² 5L",q:1,bar:true},{n:"Bouteille O² 5L (2)",q:1,bar:true},{n:"Extincteur 6Kg",q:1,p:true},{n:"Scoop + 3 sangles velcro",q:1,t:true},{n:"Pied de biche",q:1}]}]},
{id:18,label:"Cabine chauffeur",color:C.darkBlue,shelves:[{id:"A",label:"",items:[{n:"Lampe de présignalisation",q:2,t:true},{n:"Brise vitre / Coupe ceinture",q:1},{n:"Carte routière Hainaut",q:1},{n:"Carte ADR",q:1},{n:"Casque F2",q:2},{n:"Lampe pour casque F2",q:2,t:true}]}]},
{id:20,label:"Couverture",color:C.red,shelves:[{id:"A",label:"",items:[{n:"Couverture",q:0,okOnly:true}]}]},
]},
};

// ══════════════════════════════════════
// STORAGE HOOK
// ══════════════════════════════════════
function usePersistedChecklists() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = localStorage.getItem(STORAGE_KEY);
        if (result) {
          setData(JSON.parse(result));
        } else {
          setData(CHECKLISTS);
        }
      } catch {
        setData(CHECKLISTS);
      }
      setLoaded(true);
    }
    load();
  }, []);

  async function save(newData) {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch(e) {
      console.error("Save error", e);
    }
  }

  return [data, save, loaded];
}

// ══════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════
function AdminPanel({ checklists, onSave, onBack }) {
  const [view, setView] = useState("home");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [editData, setEditData] = useState(JSON.parse(JSON.stringify(checklists)));
  const [saved, setSaved] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const confirmDelete = (message, onConfirm) => setConfirmData({message, onConfirm});

  const [newVehicleName, setNewVehicleName] = useState("");
  const [newSectionLabel, setNewSectionLabel] = useState("");
  const [newSectionColor, setNewSectionColor] = useState(C.red);
  const [newShelfLabel, setNewShelfLabel] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQ, setNewItemQ] = useState(1);
  const [newItemP, setNewItemP] = useState(false);
  const [newItemT, setNewItemT] = useState(false);
  const [newItemS, setNewItemS] = useState(false);
  const [newItemBar, setNewItemBar] = useState(false);

  const btn = (label, onClick, color=C.accent, small=false) => (
    <button onClick={onClick} style={{background:color,border:"none",borderRadius:8,color:"white",padding:small?"6px 12px":"10px 16px",fontWeight:700,fontSize:small?12:14,cursor:"pointer"}}>{label}</button>
  );

  const inputStyle = {background:C.bg,border:"1px solid "+C.border,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,width:"100%",marginBottom:8};
  const card = {background:C.panel,border:"1px solid "+C.border,borderRadius:10,padding:"12px",marginBottom:8};

  function handleSave() {
    onSave(editData);
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  }

  if (view === "home") return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text}}>
      {confirmData&&<ConfirmDialog message={confirmData.message} onConfirm={()=>{confirmData.onConfirm();setConfirmData(null);}} onCancel={()=>setConfirmData(null)}/>}
      <div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* BUG FIX 1: Suppression de saveProgress(checks) qui n'existe pas ici */}
          <button onClick={()=>onBack()} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"6px 12px",fontSize:14}}>←</button>
          <div style={{fontWeight:800,fontSize:16}}>⚙ Admin — Véhicules</div>
        </div>
        <button onClick={handleSave} style={{background:saved?C.success:C.accent,border:"none",borderRadius:8,color:"white",padding:"8px 14px",fontWeight:700,fontSize:13}}>{saved?"✅ Sauvé":"💾 Sauvegarder"}</button>
      </div>
      <div style={{padding:"16px"}}>
        {Object.keys(editData).map(name=>(
          <div key={name} style={{...card,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontWeight:700,fontSize:15}}>🚑 {name}</div>
            <div style={{display:"flex",gap:8}}>
              {btn("✏️ Modifier",()=>{setSelectedVehicle(name);setView("vehicle");},C.darkBlue,true)}
              {btn("🗑",()=>confirmDelete("Supprimer le véhicule "+name+" ?",()=>{const d={...editData};delete d[name];setEditData(d);}),C.danger,true)}
            </div>
          </div>
        ))}
        <div style={{...card,marginTop:16}}>
          <div style={{fontWeight:700,marginBottom:10,color:C.accent}}>➕ Nouveau véhicule</div>
          <input placeholder="Nom (ex: ALPHA 8)" value={newVehicleName} onChange={e=>setNewVehicleName(e.target.value)} style={inputStyle}/>
          {btn("Ajouter",()=>{
            if(!newVehicleName.trim())return;
            setEditData(d=>({...d,[newVehicleName.trim()]:{edition:"",norme:"",sections:[]}}));
            setNewVehicleName("");
          },C.success)}
        </div>
      </div>
    </div>
  );

  const vData = editData[selectedVehicle];
  if (view === "vehicle" && vData) return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text}}>
      {confirmData&&<ConfirmDialog message={confirmData.message} onConfirm={()=>{confirmData.onConfirm();setConfirmData(null);}} onCancel={()=>setConfirmData(null)}/>}
      <div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setView("home")} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"6px 12px",fontSize:14}}>←</button>
          <div style={{fontWeight:800,fontSize:16}}>⚙ {selectedVehicle}</div>
        </div>
        <button onClick={handleSave} style={{background:saved?C.success:C.accent,border:"none",borderRadius:8,color:"white",padding:"8px 14px",fontWeight:700,fontSize:13}}>{saved?"✅ Sauvé":"💾 Sauvegarder"}</button>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{...card,marginBottom:16}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Édition</div>
          <input value={vData.edition} onChange={e=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].edition=e.target.value;setEditData(d);}} style={inputStyle}/>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Norme</div>
          <input value={vData.norme} onChange={e=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].norme=e.target.value;setEditData(d);}} style={inputStyle}/>
        </div>
        <div style={{fontWeight:700,marginBottom:10,color:C.muted,fontSize:12,textTransform:"uppercase"}}>Sections ({vData.sections.length})</div>
        {vData.sections.map((sec,si)=>(
          <div key={si} style={{...card,borderLeft:"4px solid "+sec.color}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
              <div style={{fontWeight:700}}>{sec.id} — {sec.label}</div>
              <div style={{display:"flex",gap:6}}>
                {btn("✏️",()=>{setSelectedSection(si);setView("section");},C.darkBlue,true)}
                {btn("🗑",()=>confirmDelete("Supprimer cette section ?",()=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections.splice(si,1);setEditData(d);}),C.danger,true)}
              </div>
            </div>
            <div style={{fontSize:11,color:C.muted}}>{sec.shelves.flatMap(sh=>sh.items).length} articles</div>
          </div>
        ))}
        <div style={{...card,marginTop:16}}>
          <div style={{fontWeight:700,marginBottom:10,color:C.accent}}>➕ Nouvelle section</div>
          <input placeholder="Titre section" value={newSectionLabel} onChange={e=>setNewSectionLabel(e.target.value)} style={inputStyle}/>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Couleur</div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {[C.red,C.darkBlue].map(col=>(
              <button key={col} onClick={()=>setNewSectionColor(col)} style={{width:36,height:36,background:col,borderRadius:8,border:newSectionColor===col?"3px solid white":"2px solid transparent"}}/>
            ))}
          </div>
          {btn("Ajouter",()=>{
            if(!newSectionLabel.trim())return;
            const d=JSON.parse(JSON.stringify(editData));
            d[selectedVehicle].sections.push({id:Date.now(),label:newSectionLabel.trim(),color:newSectionColor,shelves:[{id:"A",label:"",items:[]}]});
            setEditData(d);setNewSectionLabel("");
          },C.success)}
        </div>
      </div>
    </div>
  );

  const sec = vData?.sections[selectedSection];
  if (view === "section" && sec) return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text}}>
      {confirmData&&<ConfirmDialog message={confirmData.message} onConfirm={()=>{confirmData.onConfirm();setConfirmData(null);}} onCancel={()=>setConfirmData(null)}/>}
      <div style={{background:sec.color,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setView("vehicle")} style={{background:"rgba(0,0,0,0.2)",border:"none",borderRadius:8,color:"white",padding:"6px 12px",fontSize:14}}>←</button>
          <div style={{fontWeight:800,fontSize:15,color:"white"}}>⚙ {sec.label}</div>
        </div>
        <button onClick={handleSave} style={{background:saved?"rgba(34,197,94,0.8)":"rgba(0,0,0,0.25)",border:"none",borderRadius:8,color:"white",padding:"8px 14px",fontWeight:700,fontSize:13}}>{saved?"✅ Sauvé":"💾 Sauvegarder"}</button>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{...card,marginBottom:16}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Titre section</div>
          <input value={sec.label} onChange={e=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].label=e.target.value;setEditData(d);}} style={inputStyle}/>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Couleur</div>
          <div style={{display:"flex",gap:8}}>
            {[C.red,C.darkBlue].map(col=>(
              <button key={col} onClick={()=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].color=col;setEditData(d);}} style={{width:36,height:36,background:col,borderRadius:8,border:sec.color===col?"3px solid white":"2px solid transparent"}}/>
            ))}
          </div>
        </div>
        {sec.shelves.map((shelf,shi)=>(
          <div key={shi} style={card}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <input placeholder="Titre étagère (optionnel)" value={shelf.label} onChange={e=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].shelves[shi].label=e.target.value;setEditData(d);}} style={{...inputStyle,marginBottom:0,flex:1,marginRight:8}}/>
              {sec.shelves.length>1&&<button onClick={()=>confirmDelete("Supprimer cette étagère ?",()=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].shelves.splice(shi,1);setEditData(d);})} style={{background:C.danger,border:"none",borderRadius:6,color:"white",padding:"6px 10px",fontWeight:700,fontSize:12}}>🗑</button>}
            </div>
            {shelf.items.map((item,ii)=>(
              <div key={ii} style={{background:C.bg,borderRadius:8,padding:"8px 10px",marginBottom:6,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <div style={{flex:1,minWidth:0}}>
                  <input value={item.n} onChange={e=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].shelves[shi].items[ii].n=e.target.value;setEditData(d);}} style={{...inputStyle,marginBottom:4,fontSize:12}}/>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.muted}}>Qté:</span>
                    <input type="number" value={item.q} onChange={e=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].shelves[shi].items[ii].q=parseInt(e.target.value)||0;setEditData(d);}} style={{width:50,background:C.panel,border:"1px solid "+C.border,borderRadius:6,padding:"3px 6px",color:C.text,fontSize:12}}/>
                    {[["P","p","#f59e0b"],["T","t","#60a5fa"],["S","s","#a78bfa"],["O²","bar","#38bdf8"]].map(([lbl,key,col])=>(
                      <button key={key} onClick={()=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].shelves[shi].items[ii][key]=!item[key];setEditData(d);}} style={{padding:"2px 7px",borderRadius:5,border:"1px solid "+col,background:item[key]?col+"30":"transparent",color:item[key]?col:C.muted,fontSize:10,fontWeight:700}}>{lbl}</button>
                    ))}
                  </div>
                </div>
                <button onClick={()=>confirmDelete("Supprimer cet article ?",()=>{const d=JSON.parse(JSON.stringify(editData));d[selectedVehicle].sections[selectedSection].shelves[shi].items.splice(ii,1);setEditData(d);})} style={{background:C.danger,border:"none",borderRadius:6,color:"white",padding:"6px 8px",fontWeight:700,fontSize:11,flexShrink:0}}>🗑</button>
              </div>
            ))}
            <div style={{background:C.bg,borderRadius:8,padding:"10px",marginTop:8}}>
              <div style={{fontSize:11,color:C.accent,fontWeight:700,marginBottom:8}}>➕ Nouvel article</div>
              <input placeholder="Nom de l'article" value={newItemName} onChange={e=>setNewItemName(e.target.value)} style={{...inputStyle,fontSize:12}}/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:11,color:C.muted}}>Qté:</span>
                <input type="number" value={newItemQ} onChange={e=>setNewItemQ(parseInt(e.target.value)||1)} style={{width:50,background:C.panel,border:"1px solid "+C.border,borderRadius:6,padding:"3px 6px",color:C.text,fontSize:12}}/>
                {[["P","p",newItemP,setNewItemP,"#f59e0b"],["T","t",newItemT,setNewItemT,"#60a5fa"],["S","s",newItemS,setNewItemS,"#a78bfa"],["O²","bar",newItemBar,setNewItemBar,"#38bdf8"]].map(([lbl,,val,setter,col])=>(
                  <button key={lbl} onClick={()=>setter(!val)} style={{padding:"2px 7px",borderRadius:5,border:"1px solid "+col,background:val?col+"30":"transparent",color:val?col:C.muted,fontSize:10,fontWeight:700}}>{lbl}</button>
                ))}
              </div>
              <button onClick={()=>{
                if(!newItemName.trim())return;
                const d=JSON.parse(JSON.stringify(editData));
                const newItem={n:newItemName.trim(),q:newItemQ};
                if(newItemP)newItem.p=true;if(newItemT)newItem.t=true;if(newItemS)newItem.s=true;if(newItemBar)newItem.bar=true;
                d[selectedVehicle].sections[selectedSection].shelves[shi].items.push(newItem);
                setEditData(d);setNewItemName("");setNewItemQ(1);setNewItemP(false);setNewItemT(false);setNewItemS(false);setNewItemBar(false);
              }} style={{background:C.success,border:"none",borderRadius:8,color:"white",padding:"8px 14px",fontWeight:700,fontSize:13}}>Ajouter</button>
            </div>
          </div>
        ))}
        <div style={{...card,marginTop:8}}>
          <div style={{fontWeight:700,marginBottom:8,color:C.accent}}>➕ Nouvelle étagère</div>
          <input placeholder="Titre étagère (optionnel)" value={newShelfLabel} onChange={e=>setNewShelfLabel(e.target.value)} style={inputStyle}/>
          <button onClick={()=>{
            const d=JSON.parse(JSON.stringify(editData));
            d[selectedVehicle].sections[selectedSection].shelves.push({id:String.fromCharCode(65+sec.shelves.length),label:newShelfLabel,items:[]});
            setEditData(d);setNewShelfLabel("");
          }} style={{background:C.success,border:"none",borderRadius:8,color:"white",padding:"8px 14px",fontWeight:700,fontSize:13}}>Ajouter étagère</button>
        </div>
      </div>
    </div>
  );

  return null;
}

// ══════════════════════════════════════
// CHECKLIST VIEW
// ══════════════════════════════════════
function ChecklistView({vehicleName,data,onBack,onSubmit}){
const[checks,setChecks]=useState({});
const[expanded,setExpanded]=useState({[data.sections[0]?.id]:true});
const[amb1,setAmb1]=useState("");const[amb2,setAmb2]=useState("");
const[semaine,setSemaine]=useState("");const[remarks,setRemarks]=useState("");
const[submitted,setSubmitted]=useState(false);
const gk=(sId,shId,name)=>`${sId}__${shId}__${name}`;
const saveProgress=async(ch)=>{const key="prog_"+getWeekKey()+"_"+vehicleName;localStorage.setItem(key,JSON.stringify(ch));try{const {doc,setDoc}=await import("firebase/firestore");await setDoc(doc(db,"progress",key),{checks:ch,week:getWeekKey(),vehicleName,updatedAt:Date.now()});}catch(e){}};
useEffect(()=>{const key="prog_"+getWeekKey()+"_"+vehicleName;async function load(){try{const {doc,getDoc}=await import("firebase/firestore");const snap=await getDoc(doc(db,"progress",key));if(snap.exists())setChecks(snap.data().checks);}catch(e){const saved=localStorage.getItem(key);if(saved)setChecks(JSON.parse(saved));}}load();},[vehicleName]);
const setC=(key,field,value)=>setChecks(p=>({...p,[key]:{...p[key],[field]:value}}));
const toggle=(id)=>setExpanded(p=>({...p,[id]:!p[id]}));
const setCF=(key,found,required)=>setChecks(p=>({...p,[key]:{...p[key],found,required}}));
const setTest=(key,val)=>setChecks(p=>({...p,[key]:{...p[key],testOk:val}}));
const setSeal=(key,val)=>setChecks(p=>({...p,[key]:{...p[key],sealOk:val}}));
const allItems=data.sections.flatMap(s=>s.shelves.flatMap(sh=>sh.items));
const totalItems=allItems.length;
const checkedItems=Object.values(checks).filter(c=>c.found!==undefined).length;
const progress=totalItems>0?Math.round((checkedItems/totalItems)*100):0;
const nokItems=Object.entries(checks).filter(([,v])=>v.found!==undefined&&v.found<v.required);
const itemHasIssue=(key,item)=>{
  const s=checks[key]||{};
  if(s.found!==undefined&&s.found<item.q)return true;
  if(item.t&&s.testOk===false)return true;
  if(item.s&&s.sealOk===false)return true;
  if(item.p&&s.date&&isExpired(s.date))return true;
  return false;
};
const getMissingValidations=()=>{
  const missing=[];
  data.sections.forEach(sec=>{
    sec.shelves.forEach(sh=>{
      sh.items.forEach(item=>{
        if(item.okOnly)return;
        const key=gk(sec.id,sh.id,item.n);
        const state=checks[key]||{};
        if(state.found===undefined)missing.push(item.n+" (Présence)");
        else{
          if(item.t&&state.testOk===undefined)missing.push(item.n+" (Fonctionnel)");
          if(item.s&&state.sealOk===undefined)missing.push(item.n+" (Scellé)");
        }
      });
    });
  });
  return missing;
};
const missingValidations=getMissingValidations();
const canSubmit=missingValidations.length===0;

if(submitted)return(
<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text}}>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
<button onClick={()=>setSubmitted(false)} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"6px 12px",fontSize:14}}>←</button>
<div style={{fontWeight:800,fontSize:16}}>📋 Rapport {vehicleName}</div>
</div>
<div style={{padding:"20px",maxWidth:560,margin:"0 auto"}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
{[{val:`${checkedItems}/${totalItems}`,label:"Vérifié",color:C.accent},{val:checkedItems-nokItems.length,label:"OK",color:C.success},{val:nokItems.length,label:"Manques",color:nokItems.length>0?C.danger:C.muted}].map(s=>(
<div key={s.label} style={{background:C.panel,border:"1px solid "+C.border,borderRadius:10,padding:"12px",textAlign:"center"}}>
<div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.val}</div>
<div style={{fontSize:10,color:C.muted,textTransform:"uppercase"}}>{s.label}</div>
</div>
))}
</div>
<div style={{background:C.panel,border:"1px solid "+C.border,borderRadius:12,padding:"16px",marginBottom:14}}>
{[["Véhicule",vehicleName],["Ambulancier 1",amb1||"—"],["Ambulancier 2",amb2||"—"],["Semaine",semaine||"—"],["Date",new Date().toLocaleDateString("fr-FR")]].map(([k,v])=>(
<div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:7,paddingBottom:7,borderBottom:"1px solid "+C.border}}>
<span style={{color:C.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
</div>
))}
</div>
{nokItems.length>0&&(
<div style={{background:C.dangerSoft,border:"1px solid "+C.danger,borderRadius:12,padding:"16px",marginBottom:14}}>
<div style={{fontWeight:800,color:C.danger,marginBottom:12,fontSize:14}}>⚠ Matériel manquant ({nokItems.length})</div>
{nokItems.map(([key,val])=>{
  const parts=key.split("__");
  const section=data.sections.find(s=>String(s.id)===parts[0]);
  return(<div key={key} style={{borderLeft:"2px solid "+C.danger,paddingLeft:10,marginBottom:8}}>
    <div style={{fontSize:11,color:C.muted}}>{section?.label}</div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <span style={{fontSize:13,fontWeight:600}}>{parts[2]}</span>
      <span style={{color:C.danger,fontWeight:700,fontSize:12}}>Manque {val.required-val.found}/{val.required}</span>
    </div>
  </div>);
})}
</div>
)}
{remarks&&<div style={{background:C.panel,border:"1px solid "+C.border,borderRadius:12,padding:"16px",marginBottom:14}}><div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:8}}>Remarques</div><div style={{fontSize:13}}>{remarks}</div></div>}
<div style={{background:"rgba(34,197,94,0.12)",border:"1px solid "+C.success,borderRadius:10,padding:"14px",textAlign:"center",fontWeight:700,color:C.success}}>✅ Rapport envoyé au responsable</div>
<button onClick={()=>{saveProgress(checks);onBack();}} style={{width:"100%",marginTop:12,background:"transparent",border:"1px solid "+C.border,borderRadius:10,color:C.muted,padding:"12px",fontWeight:700,fontSize:14}}>← Retour à la liste</button>
</div>
</div>
);

return(
<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,display:"flex",flexDirection:"column"}}>
<style>{GS}</style>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"13px 16px",position:"sticky",top:0,zIndex:10}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<button onClick={()=>{saveProgress(checks);onBack();}} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"5px 10px",fontSize:14}}>←</button>
<div style={{width:34,height:34,background:C.red,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🚑</div>
<div>
<div style={{fontWeight:800,fontSize:15}}>{vehicleName} — Checklist</div>
<div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.8px"}}>Norme {data.norme} · Éd. {data.edition}</div>
</div>
</div>
<div style={{textAlign:"right"}}>
<div style={{fontSize:20,fontWeight:800,color:progress===100?C.success:C.accent}}>{progress}%</div>
<div style={{fontSize:10,color:C.muted}}>{checkedItems}/{totalItems}</div>
</div>
</div>
<div style={{height:4,background:C.border,borderRadius:4,overflow:"hidden"}}>
<div style={{height:"100%",width:`${progress}%`,background:progress===100?C.success:C.accent,borderRadius:4,transition:"width 0.3s"}}/>
</div>
</div>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"12px 16px",display:"flex",gap:8}}>
<input value={amb1} onChange={e=>setAmb1(e.target.value)} placeholder="Ambulancier 1" style={{flex:1,background:C.bg,border:"1px solid "+C.border,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13}}/>
<input value={amb2} onChange={e=>setAmb2(e.target.value)} placeholder="Ambulancier 2" style={{flex:1,background:C.bg,border:"1px solid "+C.border,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13}}/>
<input value={semaine} onChange={e=>setSemaine(e.target.value)} placeholder="Sem.N°" style={{width:75,background:C.bg,border:"1px solid "+C.border,borderRadius:8,padding:"8px 10px",color:C.text,fontSize:13}}/>
</div>
<div style={{flex:1,padding:"12px 12px 100px"}}>
{data.sections.filter(s=>s.shelves.some(sh=>sh.items.length>0)).map(section=>{
const allKeys=section.shelves.flatMap(sh=>sh.items.map(item=>({key:gk(section.id,sh.id,item.n),item})));
const sChecked=allKeys.filter(({key})=>checks[key]?.found!==undefined).length;
const sHasIssue=allKeys.some(({key,item})=>itemHasIssue(key,item));
const isExp=expanded[section.id];
return(
<div key={section.id} style={{marginBottom:8,border:"1px solid "+C.border,borderRadius:12,overflow:"hidden"}}>
<button onClick={()=>toggle(section.id)} style={{width:"100%",background:section.color,border:"none",padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",color:"white"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{background:"rgba(0,0,0,0.25)",borderRadius:6,padding:"2px 7px",fontSize:11,fontWeight:700}}>{section.id}</span>
<span style={{fontWeight:700,fontSize:13}}>{section.label}</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:6}}>
{sHasIssue&&<span style={{background:C.danger,borderRadius:20,padding:"2px 7px",fontSize:10,fontWeight:700}}>⚠</span>}
<span style={{fontSize:11,opacity:0.8}}>{sChecked}/{allKeys.length}</span>
<span style={{fontSize:14,opacity:0.7}}>{isExp?"▲":"▼"}</span>
</div>
</button>
{isExp&&section.shelves.map(shelf=>(
<div key={shelf.id}>
{shelf.label&&shelf.items.length>0&&<div style={{background:"#1a1f2e",padding:"7px 14px",fontSize:10,fontWeight:700,color:section.color,textTransform:"uppercase",letterSpacing:"1px",borderTop:"1px solid "+C.border}}>{shelf.label}</div>}
{shelf.items.map((item,idx)=>{
const key=gk(section.id,shelf.id,item.n);
const state=checks[key]||{};
const found=state.found;
const isMissing=found!==undefined&&found<item.q;
const isOk=found!==undefined&&found>=item.q;
const isBinary=item.t||item.s||item.okOnly;
const presenceOk=found!==undefined&&found>=item.q;
const presenceNok=found!==undefined&&found<item.q;
const expired=item.p&&state.date&&isExpired(state.date);
return(
<div key={idx} style={{background:isMissing||expired?"rgba(239,68,68,0.06)":isOk?"rgba(34,197,94,0.04)":C.panel,borderTop:"1px solid "+C.border,padding:"11px 14px"}}>
<div style={{fontSize:13,fontWeight:600,color:C.text,display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:8}}>
{item.n}
{item.t&&<span style={{background:"#1d4ed820",border:"1px solid #1d4ed8",color:"#60a5fa",borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:700}}>TEST</span>}
{item.s&&<span style={{background:"#7c3aed20",border:"1px solid #7c3aed",color:"#a78bfa",borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:700}}>SCELLÉ</span>}
{item.p&&<span style={{background:expired?"#ef444420":"#f59e0b20",border:"1px solid "+(expired?C.danger:C.warning),color:expired?C.danger:"#fbbf24",borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:700}}>{expired?"⚠ PÉRIMÉ":"PÉREMPTION"}</span>}
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:(item.t||item.s||item.bar)?6:0}}>
<div style={{fontSize:11,color:C.muted,minWidth:80}}>{item.okOnly?"État":"Présence"+((!isBinary)?" (requis: "+item.q+")":"")}</div>
<div style={{display:"flex",gap:5,alignItems:"center"}}>
<button onClick={()=>setCF(key,state.found===item.q?undefined:item.q,item.q)} style={{padding:"6px 12px",borderRadius:8,border:presenceOk?"2px solid "+C.success:"1px solid "+C.border,background:presenceOk?"rgba(34,197,94,0.12)":"transparent",color:presenceOk?C.success:C.muted,fontWeight:700,fontSize:12}}>OK</button>
{!item.okOnly&&<button onClick={()=>setCF(key,state.found===0?undefined:0,item.q)} style={{padding:"6px 10px",borderRadius:8,border:presenceNok?"2px solid "+C.danger:"1px solid "+C.border,background:presenceNok?"rgba(239,68,68,0.1)":"transparent",color:presenceNok?C.danger:C.muted,fontWeight:700,fontSize:12}}>NOK</button>}
{!isBinary&&!item.bar&&<div style={{display:"flex",alignItems:"center",background:C.bg,border:"1px solid "+(isMissing?C.danger:isOk?C.success:C.border),borderRadius:10,overflow:"hidden"}}>
<button onClick={()=>setCF(key,Math.max(0,(found!==undefined?found:item.q)-1),item.q)} style={{width:30,height:32,background:"transparent",border:"none",color:C.muted,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
<div style={{minWidth:28,textAlign:"center",fontSize:13,fontWeight:800,color:isMissing?C.danger:isOk?C.success:C.text,borderLeft:"1px solid "+C.border,borderRight:"1px solid "+C.border,height:32,display:"flex",alignItems:"center",justifyContent:"center"}}>{found!==undefined?found:"?"}</div>
<button onClick={()=>setCF(key,(found!==undefined?found:0)+1,item.q)} style={{width:30,height:32,background:"transparent",border:"none",color:C.muted,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
</div>}
</div>
</div>
{item.bar&&(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:6,paddingTop:5,borderTop:"1px dashed "+C.border}}>
<div style={{fontSize:11,color:C.blue,minWidth:80}}>Niveau (bar)</div>
<div style={{display:"flex",alignItems:"center",gap:6}}>
<input type="number" min="0" max="300" value={state.bar!==undefined?state.bar:""} onChange={e=>setC(key,"bar",e.target.value===""?undefined:Math.min(300,Math.max(0,parseInt(e.target.value)||0)))} placeholder="0-300" style={{width:80,background:C.bg,border:"1px solid "+C.border,borderRadius:8,padding:"6px 10px",color:C.text,fontSize:13,textAlign:"center"}}/>
<span style={{fontSize:11,color:C.muted}}>/ 300 bar</span>
</div>
</div>)}
{item.t&&(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:item.s?6:0,paddingTop:5,borderTop:"1px dashed "+C.border}}>
<div style={{fontSize:11,color:"#60a5fa",minWidth:80}}>Fonctionnel</div>
<div style={{display:"flex",gap:5}}>
<button onClick={()=>setTest(key,state.testOk===true?undefined:true)} style={{padding:"6px 12px",borderRadius:8,border:state.testOk===true?"2px solid "+C.success:"1px solid "+C.border,background:state.testOk===true?"rgba(34,197,94,0.12)":"transparent",color:state.testOk===true?C.success:C.muted,fontWeight:700,fontSize:12}}>OK</button>
<button onClick={()=>setTest(key,state.testOk===false?undefined:false)} style={{padding:"6px 10px",borderRadius:8,border:state.testOk===false?"2px solid "+C.danger:"1px solid "+C.border,background:state.testOk===false?"rgba(239,68,68,0.1)":"transparent",color:state.testOk===false?C.danger:C.muted,fontWeight:700,fontSize:12}}>NOK</button>
</div>
</div>)}
{item.s&&(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,paddingTop:5,borderTop:"1px dashed "+C.border}}>
<div style={{fontSize:11,color:"#a78bfa",minWidth:80}}>Scellé intact</div>
<div style={{display:"flex",gap:5}}>
<button onClick={()=>setSeal(key,state.sealOk===true?undefined:true)} style={{padding:"6px 12px",borderRadius:8,border:state.sealOk===true?"2px solid "+C.success:"1px solid "+C.border,background:state.sealOk===true?"rgba(34,197,94,0.12)":"transparent",color:state.sealOk===true?C.success:C.muted,fontWeight:700,fontSize:12}}>OK</button>
<button onClick={()=>setSeal(key,state.sealOk===false?undefined:false)} style={{padding:"6px 10px",borderRadius:8,border:state.sealOk===false?"2px solid "+C.danger:"1px solid "+C.border,background:state.sealOk===false?"rgba(239,68,68,0.1)":"transparent",color:state.sealOk===false?C.danger:C.muted,fontWeight:700,fontSize:12}}>NOK</button>
</div>
</div>)}
{item.p&&<input type="date" value={state.date||""} onChange={e=>setC(key,"date",e.target.value)} style={{marginTop:6,background:C.bg,border:"1px solid "+(expired?C.danger:C.border),borderRadius:6,padding:"4px 8px",color:expired?C.danger:C.text,fontSize:11,width:150}}/>}
</div>);
})}
</div>
))}
</div>
);
})}
<div style={{background:C.panel,border:"1px solid "+C.border,borderRadius:12,padding:"14px",marginTop:6}}>
<div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>📝 Remarques</div>
<textarea value={remarks} onChange={e=>setRemarks(e.target.value)} placeholder="Matériel manquant, observations..." rows={3} style={{width:"100%",background:C.bg,border:"1px solid "+C.border,borderRadius:8,padding:"10px 12px",color:C.text,fontSize:13,resize:"none"}}/>
</div>
</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,background:C.panel,borderTop:"1px solid "+C.border,padding:"13px 16px"}}>
{!canSubmit&&<div style={{background:"rgba(239,68,68,0.1)",border:"1px solid #ef4444",borderRadius:8,padding:"8px 12px",marginBottom:8,fontSize:11,color:"#ef4444",fontWeight:600}}>⚠ Cochez OK ou NOK pour chaque article ({missingValidations.length} restant{missingValidations.length>1?"s":""})</div>}
<button onClick={()=>{if(canSubmit){const issues=[];data.sections.forEach(sec=>{sec.shelves.forEach(sh=>{sh.items.forEach(item=>{const key=gk(sec.id,sh.id,item.n);const state=checks[key]||{};if(state.found!==undefined&&state.found<item.q)issues.push({name:item.n,section:sec.label,type:"missing",missing:item.q-state.found,required:item.q});if(item.t&&state.testOk===false)issues.push({name:item.n,section:sec.label,type:"nok_test"});if(item.s&&state.sealOk===false)issues.push({name:item.n,section:sec.label,type:"nok_seal"});if(item.p&&state.date&&isExpired(state.date))issues.push({name:item.n,section:sec.label,type:"expired",date:state.date});});});});if(onSubmit)onSubmit({vehicle:vehicleName,date:new Date().toLocaleDateString("fr-FR"),semaine,amb1,amb2,progress,remarks,issues});setSubmitted(true);}}} style={{width:"100%",background:!canSubmit?C.danger:progress===100?C.success:C.accent,border:"none",borderRadius:10,color:"white",padding:"14px",fontWeight:800,fontSize:15,opacity:canSubmit?1:0.6}}>
{canSubmit?(progress===100?"✅ Envoyer au responsable":"📤 Envoyer ("+progress+"% complété)"):"⚠ "+missingValidations.length+" validation(s) manquante(s)"}
</button>
</div>
</div>
);
}

// ══════════════════════════════════════
// ADMIN LOGIN
// ══════════════════════════════════════
function AdminLogin({onSuccess,onBack}){
const[pwd,setPwd]=useState("");
const[error,setError]=useState(false);
return(
<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,display:"flex",flexDirection:"column"}}>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
  {/* BUG FIX 1: Suppression de saveProgress(checks) qui n'existe pas ici */}
  <button onClick={()=>onBack()} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"6px 12px",fontSize:14}}>←</button>
<div style={{fontWeight:800,fontSize:16}}>⚙ Admin — Connexion</div>
</div>
<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"30px"}}>
<div style={{width:"100%",maxWidth:360}}>
<div style={{background:C.panel,border:"1px solid "+C.border,borderRadius:16,padding:"28px"}}>
<div style={{fontSize:40,textAlign:"center",marginBottom:16}}>🔐</div>
<div style={{fontWeight:800,fontSize:18,textAlign:"center",marginBottom:20}}>Espace Admin</div>
<input type="password" placeholder="Mot de passe" value={pwd} onChange={e=>{setPwd(e.target.value);setError(false);}} onKeyDown={e=>{if(e.key==="Enter"){if(pwd===ADMIN_PWD)onSuccess();else setError(true);}}} style={{width:"100%",background:C.bg,border:"1px solid "+(error?C.danger:C.border),borderRadius:10,padding:"12px 14px",color:C.text,fontSize:15,marginBottom:12}}/>
{error&&<div style={{color:C.danger,fontSize:12,marginBottom:12,textAlign:"center"}}>Mot de passe incorrect</div>}
<button onClick={()=>{if(pwd===ADMIN_PWD)onSuccess();else setError(true);}} style={{width:"100%",background:C.accent,border:"none",borderRadius:10,color:"white",padding:"13px",fontWeight:800,fontSize:15}}>Accéder</button>
</div>
</div>
</div>
</div>
);
}

// ══════════════════════════════════════
// REPORTS STORAGE KEY
// ══════════════════════════════════════
const REPORTS_KEY="aps_reports_v1";
const WEEKLY_KEY="aps_weekly_done_v1";
const REPORTS_PWD="aps.bravo-xavier";

function getWeekKey(){
  const now=new Date();
  const jan1=new Date(now.getFullYear(),0,1);
  const week=Math.ceil(((now-jan1)/86400000+jan1.getDay()+1)/7);
  return now.getFullYear()+"-W"+String(week).padStart(2,"0");
}

// ══════════════════════════════════════
// REPORTS LOGIN
// ══════════════════════════════════════
function ReportsLogin({onSuccess,onBack}){
const[pwd,setPwd]=useState("");
const[error,setError]=useState(false);
return(
<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,display:"flex",flexDirection:"column"}}>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
  {/* BUG FIX 1: Suppression de saveProgress(checks) qui n'existe pas ici */}
  <button onClick={()=>onBack()} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"6px 12px",fontSize:14}}>←</button>
<div style={{fontWeight:800,fontSize:16}}>📋 Rapports — Connexion</div>
</div>
<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"30px"}}>
<div style={{width:"100%",maxWidth:360}}>
<div style={{background:C.panel,border:"1px solid "+C.border,borderRadius:16,padding:"28px"}}>
<div style={{fontSize:40,textAlign:"center",marginBottom:16}}>📋</div>
<div style={{fontWeight:800,fontSize:18,textAlign:"center",marginBottom:20}}>Espace Rapports</div>
<input type="password" placeholder="Mot de passe" value={pwd} onChange={e=>{setPwd(e.target.value);setError(false);}} onKeyDown={e=>{if(e.key==="Enter"){if(pwd===REPORTS_PWD)onSuccess();else setError(true);}}} style={{width:"100%",background:C.bg,border:"1px solid "+(error?C.danger:C.border),borderRadius:10,padding:"12px 14px",color:C.text,fontSize:15,marginBottom:12}}/>
{error&&<div style={{color:C.danger,fontSize:12,marginBottom:12,textAlign:"center"}}>Mot de passe incorrect</div>}
<button onClick={()=>{if(pwd===REPORTS_PWD)onSuccess();else setError(true);}} style={{width:"100%",background:C.accent,border:"none",borderRadius:10,color:"white",padding:"13px",fontWeight:800,fontSize:15}}>Accéder</button>
</div>
</div>
</div>
</div>
);
}

// ══════════════════════════════════════
// REPORTS VIEW
// ══════════════════════════════════════
function ReportsView({onBack,reports,onDeleteReport,onTreatItem}){
const[filter,setFilter]=useState("all");
const[confirmData,setConfirmData]=useState(null);
const confirmDelete=(message,onConfirm)=>setConfirmData({message,onConfirm});

const filtered=reports.filter(r=>{
  if(filter==="pending")return!r.fullyTreated;
  if(filter==="done")return r.fullyTreated;
  return true;
}).sort((a,b)=>b.timestamp-a.timestamp);

return(
<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,display:"flex",flexDirection:"column"}}>
{confirmData&&<ConfirmDialog message={confirmData.message} onConfirm={()=>{confirmData.onConfirm();setConfirmData(null);}} onCancel={()=>setConfirmData(null)}/>}
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
  {/* BUG FIX 1: Suppression de saveProgress(checks) qui n'existe pas ici */}
  <button onClick={()=>onBack()} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,padding:"6px 12px",fontSize:14}}>←</button>
<div style={{fontWeight:800,fontSize:16}}>📋 Rapports ({reports.length})</div>
</div>
</div>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"10px 16px",display:"flex",gap:8}}>
{[["all","Tous"],["pending","⚠ En cours"],["done","✅ Traités"]].map(([val,lbl])=>(
<button key={val} onClick={()=>setFilter(val)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid "+(filter===val?C.accent:C.border),background:filter===val?C.accentSoft:"transparent",color:filter===val?C.accent:C.muted,fontWeight:700,fontSize:12}}>{lbl}</button>
))}
</div>
<div style={{flex:1,padding:"12px"}}>
{filtered.length===0&&<div style={{textAlign:"center",color:C.muted,padding:"40px",fontSize:14}}>Aucun rapport</div>}
{filtered.map(report=>(
<div key={report.id} style={{background:C.panel,border:"1px solid "+(report.fullyTreated?C.success:C.border),borderRadius:12,padding:"14px",marginBottom:10}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
<div>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
<span style={{fontWeight:800,fontSize:15}}>🚑 {report.vehicle}</span>
{report.fullyTreated&&<span style={{background:C.successSoft,border:"1px solid "+C.success,color:C.success,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>✅ TRAITÉ</span>}
</div>
<div style={{fontSize:12,color:C.muted}}>{report.date} · Sem. {report.semaine||"?"}</div>
<div style={{fontSize:12,color:C.muted}}>{report.amb1||"—"} / {report.amb2||"—"}</div>
<div style={{fontSize:11,color:C.muted,marginTop:2}}>Complété à {report.progress}%</div>
</div>
<button onClick={()=>confirmDelete("Supprimer ce rapport ?",()=>onDeleteReport(report.id))} style={{background:C.dangerSoft,border:"1px solid "+C.danger,borderRadius:8,color:C.danger,padding:"6px 10px",fontSize:12,fontWeight:700}}>🗑</button>
</div>
{report.issues&&report.issues.length>0&&(
<div>
<div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:8}}>Problèmes ({report.issues.filter(i=>!i.treated).length} restants)</div>
{report.issues.map((issue,idx)=>(
<div key={idx} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:issue.treated?"rgba(34,197,94,0.06)":C.dangerSoft,border:"1px solid "+(issue.treated?C.success:C.danger),borderRadius:8,padding:"8px 10px",marginBottom:6}}>
<div style={{flex:1}}>
<div style={{fontSize:12,fontWeight:700,color:issue.treated?C.success:C.text,textDecoration:issue.treated?"line-through":"none"}}>{issue.name}</div>
<div style={{fontSize:10,color:C.muted}}>{issue.section} · {issue.type==="missing"?"Manque "+issue.missing+"/"+issue.required:issue.type==="expired"?"⚠ PÉRIMÉ":issue.type==="nok_test"?"❌ Test NOK":"❌ Scellé NOK"}</div>
</div>
{!issue.treated&&<button onClick={()=>onTreatItem(report.id,idx)} style={{background:C.successSoft,border:"1px solid "+C.success,borderRadius:8,color:C.success,padding:"6px 10px",fontSize:11,fontWeight:700,marginLeft:8,flexShrink:0}}>✅ Traité</button>}
{issue.treated&&<span style={{color:C.success,fontSize:16,marginLeft:8}}>✓</span>}
</div>
))}
</div>
)}
{report.remarks&&<div style={{marginTop:8,background:C.bg,borderRadius:8,padding:"8px 10px"}}><div style={{fontSize:10,color:C.muted,marginBottom:4}}>REMARQUES</div><div style={{fontSize:12}}>{report.remarks}</div></div>}
</div>
))}
</div>
</div>
);
}

// ══════════════════════════════════════
// APP
// ══════════════════════════════════════
export default function App(){
const[checklists,saveChecklists,loaded]=usePersistedChecklists();
const[selected,setSelected]=useState(null);
const[screen,setScreen]=useState("home");
const[weeklyDone,setWeeklyDone]=useState({});
const[reports,setReports]=useState([]);

useEffect(()=>{
  async function loadWeekly(){
    try{
      const r=localStorage.getItem(WEEKLY_KEY);
      if(r){
        const data=JSON.parse(r);
        const currentWeek=getWeekKey();
        const filtered={};
        Object.keys(data).forEach(k=>{if(data[k].week===currentWeek)filtered[k]=data[k];});
        setWeeklyDone(filtered);
      }
    }catch{}
    try{
      const snap=await getDoc(doc(db,"weekly",getWeekKey()));
      if(snap.exists())setWeeklyDone(prev=>({...prev,...snap.data()}));
    }catch(e){console.error("FB WEEKLY LOAD",e);}
  }
  async function loadReports(){
    try{
      const r=localStorage.getItem(REPORTS_KEY);
      if(r)setReports(JSON.parse(r));
    }catch{}
    try{
      const {getDocs,collection}=await import("firebase/firestore");
      const snap=await getDocs(collection(db,"reports"));
      const docs=snap.docs.map(d=>d.data());
      if(docs.length>0)setReports(docs);
    }catch(e){console.error("FB LOAD ERROR",e);}
  }
  loadWeekly();
  loadReports();
},[]);

async function markWeeklyDone(vehicleName){
  const updated={...weeklyDone,[vehicleName]:{week:getWeekKey(),done:true}};
  setWeeklyDone(updated);
  try{localStorage.setItem(WEEKLY_KEY,JSON.stringify(updated));}catch{}
  try{
    const {updateDoc,setDoc:sd}=await import("firebase/firestore");
    const wr=doc(db,"weekly",getWeekKey());
    try{await updateDoc(wr,{[vehicleName]:{week:getWeekKey(),done:true}});}
    catch{await sd(wr,{[vehicleName]:{week:getWeekKey(),done:true}});}
  }catch(e){console.error("FB WEEKLY ERROR",e);}
}

// BUG FIX 2 & 3: saveReport corrigé (vehicle pas vehicleName)
async function saveReport(reportData){
  const newReport={
    id:Date.now(),
    timestamp:Date.now(),
    ...reportData,
    fullyTreated:reportData.issues.length===0,
  };
  const updated=[...reports,newReport];
  setReports(updated);
  try{localStorage.setItem(REPORTS_KEY,JSON.stringify(updated));}catch(e){console.error("SAVE ERROR",e);}
  try{await setDoc(doc(db,"reports",String(newReport.id)),newReport);}catch(e){console.error("FB SAVE ERROR",e);}
  markWeeklyDone(reportData.vehicle||selected);
}

// BUG FIX 2: deleteReport corrigé (plus de référence à newReport)
async function deleteReport(reportId){
  const updated=reports.filter(r=>r.id!==reportId);
  setReports(updated);
  try{localStorage.setItem(REPORTS_KEY,JSON.stringify(updated));}catch(e){console.error("SAVE ERROR",e);}
  try{
    const {deleteDoc,doc:d}=await import("firebase/firestore");
    await deleteDoc(d(db,"reports",String(reportId)));
  }catch(e){console.error("FB DELETE ERROR",e);}
}

// BUG FIX 2: treatItem corrigé (plus de référence à newReport)
async function treatItem(reportId,issueIdx){
  const updated=reports.map(r=>{
    if(r.id!==reportId)return r;
    const newIssues=r.issues.map((iss,i)=>i===issueIdx?{...iss,treated:true}:iss);
    const allTreated=newIssues.every(iss=>iss.treated);
    return{...r,issues:newIssues,fullyTreated:allTreated};
  });
  setReports(updated);
  try{localStorage.setItem(REPORTS_KEY,JSON.stringify(updated));}catch(e){console.error("SAVE ERROR",e);}
  try{
    const rep=updated.find(r=>r.id===reportId);
    const {doc:d,setDoc:sd}=await import("firebase/firestore");
    await sd(d(db,"reports",String(reportId)),rep);
  }catch(e){console.error("FB TREAT ERROR",e);}
}

if(!loaded)return(
<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",color:C.muted,fontSize:16}}>Chargement...</div>
);

if(screen==="login")return <AdminLogin onSuccess={()=>setScreen("admin")} onBack={()=>setScreen("home")}/>;
if(screen==="admin")return <AdminPanel checklists={checklists} onSave={saveChecklists} onBack={()=>setScreen("home")}/>;
if(screen==="reports_login")return <ReportsLogin onSuccess={()=>setScreen("reports")} onBack={()=>setScreen("home")}/>;
if(screen==="reports")return <ReportsView onBack={()=>setScreen("home")} reports={reports} onDeleteReport={deleteReport} onTreatItem={treatItem}/>;
if(selected)return <ChecklistView vehicleName={selected} data={checklists[selected]} onBack={()=>setSelected(null)} onSubmit={saveReport}/>;

const currentWeek=getWeekKey();

return(
<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,display:"flex",flexDirection:"column"}}>
<style>{GS}</style>
<div style={{background:C.panel,borderBottom:"1px solid "+C.border,padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<button onClick={()=>setScreen("reports_login")} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:10,color:C.muted,padding:"8px 12px",fontSize:20}}>📋</button>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:40,height:40,background:C.red,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🚑</div>
<div>
<div style={{fontWeight:800,fontSize:18}}>A.P.S. — Checklists</div>
<div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"1.2px"}}>Sélectionnez votre véhicule</div>
</div>
</div>
<button onClick={()=>setScreen("login")} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:10,color:C.muted,padding:"8px 12px",fontSize:20}}>⚙</button>
</div>
<div style={{flex:1,padding:"24px 20px",maxWidth:480,margin:"0 auto",width:"100%"}}>
<div style={{fontSize:12,color:C.muted,marginBottom:16,textAlign:"center"}}>Semaine {currentWeek}</div>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{Object.keys(checklists).map(name=>{
const done=weeklyDone[name]&&weeklyDone[name].week===currentWeek;
const inProg=!done&&!!localStorage.getItem("prog_"+currentWeek+"_"+name);
return(
<button key={name} onClick={()=>setSelected(name)} style={{background:done?"rgba(34,197,94,0.08)":C.panel,border:"1px solid "+(done?C.success:inProg?"#f97316":C.border),borderRadius:13,padding:"16px 20px",color:C.text,textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:42,height:42,background:done?C.success:C.red,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{done?"✅":"🚑"}</div>
<div>
<div style={{fontWeight:800,fontSize:16}}>{name}</div>
<div style={{fontSize:11,color:done?C.success:C.muted}}>{done?"✅ Fait cette semaine":"Éd. "+checklists[name].edition+" · Norme "+checklists[name].norme}</div>
</div>
</div>
<span style={{color:C.muted,fontSize:20}}>→</span>
</button>
);
})}
</div>
</div>
</div>
);
}
