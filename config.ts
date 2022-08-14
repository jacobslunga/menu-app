const AWS_S3_ACCESS_KEY = "AKIA3TDR7DFBKUZV3FFB";
const AWS_S3_SECRET_KEY = "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";

const MEALS: Array<string> = [
  "Korv stroganoff",
  "Korv med Bröd",
  "Kycklinghamburgare",
  "Pasta med tomatsås",
  "Köttbullar & potatismos",
  "Fiskpinnar",
  "Toast Skagen",
  "Pannkakor",
  "Wallenbergare",
  "Kalops",
  "Kroppkakor",
  "Stekt strömming",
  "Kebab",
  "Falafel",
  "Pyttipanna",
  "Raggmunkar",
  "Falukorv & Gräddstuvade Makaroner",
  "Surströmming",
  "Sill",
  "Ärtsoppa",
  "Köttfärslimpa",
  "Fläskpannkaka",
  "Biff Rydberg",
  "Renskav",
  "Kåldolmar",
  "Tunnbrödsrulle",
  "Tacos",
  "Sushi",
  "Blomkåls- och broccoligratäng med kyckling",
  "Köttfärsgratäng med potatis och ostsås",
  "Kycklingpanna med bacon",
  "Heta räkor med vitlök, chili och persilja",
  "Kyckling- och bacongratäng med ris",
  "Fisksoppa",
];

const INGREDIENTS = [
  {
    title: "Korv stroganoff",
    ingredients: [
      "4 portioner ris",
      "550 g falukorv",
      "1 gul lök",
      "1 msk olja",
      "3 msk tomatpuré",
      "2 1/2 dl matlagningsgrädde",
      "1 dl mjölk",
      "1 msk japansk soja",
      "1 tsk dijonsenap",
      "peppar",
      "salt",
    ],
  },
  {
    title: "Korv med bröd",
    ingredients: [
      "Valfri korv",
      "Korvbröd",
      "Ketchup eller senap",
      "Rostad lök",
    ],
  },
  {
    title: "Kycklinghamburgare",
    ingredients: [
      "500 g kycklingfärs",
      "1 tsk salt",
      "2 krm svartpeppar, malen",
      "1 st ägg",
      "1 st vitlöksklyfta",
      "1/2 kruka persilja",
      "1 msk olivolja",
    ],
  },
];

const RECIPES = [
  {
    title: "Korv stroganoff",
    recipes: [
      "https://www.ica.se/recept/korvstroganoff-med-ris-533512/",
      "https://www.koket.se/sara_begner/soppor_och_grytor/korv_och_chark/korv_stroganoff",
      "https://www.recepten.se/recept/korv_stroganoff.html",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/stroganoff.jpeg",
  },
  {
    title: "Korv med bröd",
    recipes: [
      "https://www.koket.se/lyxig-korv-och-brod-med-rostad-och-picklad-lok",
      "https://receptfavoriter.se/recept/korv-med-broed.html",
      "https://www.ica.se/artikel/korv-med-brod/",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/korvmed.jpeg",
  },
  {
    title: "Kycklinghamburgare",
    recipes: [
      "https://www.tasteline.com/recept/kycklingburgare-med-sotpotatisfrittes-och-picklad-lok/",
      "https://www.ica.se/recept/kycklingburgare-med-syrad-lok-och-avokado-720528/",
      "https://zeinaskitchen.se/kycklingburgare-med-gurkmajonnas/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kycklingham.jpeg",
  },
  {
    title: "Pasta med tomatsås",
    recipes: [
      "https://www.koket.se/kramig-snabb-tomatpasta",
      "https://zeinaskitchen.se/kramig-pasta-i-tomatsas-middag-pa-30-min/",
      "https://receptfavoriter.se/recept/pasta-med-tomatsas.html",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/pastatomat.jpeg",
  },
  {
    title: "Köttbullar & potatismos",
    recipes: [
      "https://www.koket.se/markus-aujalay/kottbullar-med-rarorda-lingon-och-potatismos",
      "https://recept.se/recept/kottbullar-med-potatismos-och-graddsas",
      "https://www.tasteline.com/recept/klassiska-kottbullar-med-potatismos-lingon-och-inlagd-gurka/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/ko%CC%88ttbullar.avif",
  },
  {
    title: "Fiskpinnar",
    recipes: [
      "https://www.koket.se/hemmagjorda-fiskpinnar",
      "https://www.mathem.se/recept/fiskpinnar-med-ortkrossad-potatis-och-grona-artor",
      "https://www.tasteline.com/recept/fiskpinnar-med-ortkrossad-potatis-och-grona-artor/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/fiskpinnar.jpeg",
  },
  {
    title: "Toast Skagen",
    recipes: [
      "https://www.mathem.se/recept/toast-skagen-med-lojrom-pa-grillat-surdegsbrod",
      "https://www.tasteline.com/recept/lyxig-toast-skagen/",
      "https://www.arla.se/recept/toast-skagen/",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/skagen.jpeg",
  },
  {
    title: "Pannkakor",
    recipes: [
      "https://www.ica.se/recept/pannkakor-grundsmet-2083/",
      "https://www.koket.se/pannkaka-2",
      "https://www.mathem.se/recept/pannkakor---grundrecept",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/pannkakor.jpeg",
  },
  {
    title: "Wallenbergare",
    recipes: [
      "https://www.arla.se/recept/wallenbergare/",
      "https://receptfavoriter.se/recept/wallenbergare.html",
      "https://www.koket.se/wallenbergare-med-mandelpotatispure",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/wallen.jpeg",
  },
  {
    title: "Kalops",
    recipes: [
      "https://www.ica.se/recept/klassisk-kalops-632631/",
      "https://www.tasteline.com/recept/klassisk-kalops/",
      "https://www.koket.se/matgladje-hela-livet/leif-mannerstrom/leif-mannerstroms-kalops",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kalops.jpeg",
  },
  {
    title: "Kroppkakor",
    recipes: [
      "https://www.ica.se/recept/kroppkakor-av-kokt-potatis-3693/",
      "https://www.koket.se/matgladje-hela-livet/leif-mannerstrom/leif-mannerstroms-kroppkakor",
      "https://www.arla.se/recept/smalandska-kroppkakor/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kroppkakor.jpeg",
  },
  {
    title: "Stekt strömming",
    recipes: [
      "https://www.tasteline.com/recept/stekt-stromming/",
      "https://receptfavoriter.se/recept/stekt-stroemming-fylld-med-dill-och-kaviar.html",
      "https://www.koket.se/anders_leven/huvudratter/fisk_och_skaldjur/stekt_stromming_pa_hederligt_vis",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/surstromming.jpeg",
  },
  {
    title: "Kebab",
    recipes: [
      "https://www.tasteline.com/recept/hemmagjord-kebab/",
      "https://zeinaskitchen.se/hemmagjord-kebab/",
      "https://www.koket.se/kebab-i-pitabrod-med-tva-saser-inlagd-chili-och-krispig-sallad",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/keba.jpeg",
  },
  {
    title: "Falafel",
    recipes: [
      "https://www.koket.se/grundrecept-pa-falafel",
      "https://zeinaskitchen.se/grymt-goda-falafel/",
      "https://www.ica.se/recept/falafel-727676/",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/falafel.jpeg",
  },
  {
    title: "Pyttipanna",
    recipes: [
      "https://www.ica.se/recept/pytt-i-panna-722178/",
      "https://www.koket.se/per_morberg/varmratter/kott/per_morbergs_pyttipanna",
      "https://www.arla.se/recept/pytt-i-panna/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/pyttipanna.jpeg",
  },
  {
    title: "Raggmunkar",
    recipes: [
      "https://www.ica.se/recept/raggmunk-med-flask-721803/",
      "https://www.koket.se/per_morberg/varmratter/gronsaker__potatis_och_andra_rotfrukter/per_morbergs_raggmunk_med_flask",
      "https://www.arla.se/recept/raggmunk-med-flask/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/raggmunk.jpeg",
  },
  {
    title: "Falukorv & Gräddstuvade Makaroner",
    recipes: [
      "https://www.ica.se/recept/falukorv-med-stuvade-makaroner-725260/",
      "https://receptfavoriter.se/recept/falukorv-med-stuvade-makaroner.html",
      "https://www.kungsornen.se/recept/stuvade-makaroner-med-falukorv/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/falukorv.jpeg",
  },
  {
    title: "Surströmming",
    recipes: [
      "https://receptfavoriter.se/recept/surstroemmingsklaemma.html",
      "https://www.koket.se/malin-soderstrom/smaratter-tillbehor/fisk-skaldjur/klassisk-klamma-med-surstromming",
      "https://www.mathem.se/recept/surstrommingsklamma-med-hart-tunnbrod",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/surstromming.jpeg",
  },
  {
    title: "Ärtsoppa",
    recipes: [
      "https://receptfavoriter.se/recept/artsoppa",
      "https://www.koket.se/anders-leven/soppor-och-grytor/artor-bonor-och-linser/artsoppa-pa-klassiskt-vis",
      "https://www.ica.se/recept/artsoppa-729052/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/artsoppa.jpeg",
  },
  {
    title: "Köttfärslimpa",
    recipes: [
      "https://www.arla.se/recept/kottfarslimpa/",
      "https://www.ica.se/recept/kottfarslimpa-med-graddsas-723129/",
      "https://www.recepten.se/recept/koettfaerslimpa.html",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kottfarslimpa.jpeg",
  },
  {
    title: "Fläskpannkaka",
    recipes: [
      "https://www.ica.se/recept/flaskpannkaka-712880/",
      "https://www.recepten.se/recept/flaeskpannkaka.html",
      "https://www.tasteline.com/recept/kalle-kulas-flaskpannkaka/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/flaskpannkaka.jpeg",
  },
  {
    title: "Biff Rydberg",
    recipes: [
      "https://www.ica.se/recept/biff-rydberg-721555/",
      "https://www.mathem.se/recept/biff-rydberg-med-senapskram",
      "https://www.tasteline.com/recept/biff-rydberg/",
    ],
    imageurl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/rydberg.jpeg",
  },
  {
    title: "Renskav",
    recipes: [
      "https://www.ica.se/recept/renskav-med-champinjoner-och-lingon-723420/",
      "https://www.koket.se/anette_rosvall_och_emma_hamberg/varmratter/kott/rasande_god_renskav",
      "https://receptfavoriter.se/recept/renskav-med-kantareller.html",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/renskav.jpeg",
  },
  {
    title: "Kåldolmar",
    recipes: [
      "https://www.ica.se/recept/klassiska-kaldolmar-634365/",
      "https://www.koket.se/matgladje-hela-livet/leif-mannerstrom/kaldolmar",
      "https://www.arla.se/recept/kaldolmar-med-graddsky/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kaldolmar.jpeg",
  },
  {
    title: "Tunnbrödsrulle",
    recipes: [
      "https://www.ica.se/recept/klassisk-tunnbrodsrulle-med-varmkorv-603323/",
      "https://www.tiniskitchen.com/tunnbrodsrulle/",
      "https://snellman.fi/sv/recept/tunnbrodsrulle-med-skinka/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/tunnbrod.jpeg",
  },
  {
    title: "Tacos",
    recipes: [
      "https://www.ica.se/recept/tacos-722416/",
      "https://www.koket.se/tacos-2",
      "https://www.santamariaworld.com/se/recept/tacos/",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/tacos.jpeg",
  },
  {
    title: "Blomkåls- och broccoligratäng med kyckling",
    recipes: [
      "https://recept.se/recept/blomkals-och-broccoligratang-med-kyckling",
      "https://www.landleyskok.se/recept/kycklinggryta-med-blomkal-och-broccoli",
      "https://www.mathem.se/recept/sweet-chili-kyckling-med-broccoli-och-blomkal",
    ],
    imageUrl: "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/blomkal.avif",
  },
  {
    title: "Köttfärsgratäng med potatis och ostsås",
    recipes: [
      "https://recept.se/recept/kottfarsgratang-med-potatis-och-ostsas",
      "https://www.matklubben.se/recept/potatis-och-koettfaerslada-med-ostsas-37562",
      "https://receptfavoriter.se/recept/kottfarslada-kottfarsgratang",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kottfarsgratang.avif",
  },
  {
    title: "Kycklingpanna med bacon",
    recipes: [
      "https://recept.se/recept/senapskyckling-med-bacon-och-graslok",
      "https://www.ica.se/recept/baconlindad-kycklingfile-i-ugn-724406/",
      "https://www.koket.se/kramig-kycklinggryta-med-bacon",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kycklingpanna.avif",
  },
  {
    title: "Heta räkor med vitlök, chili och persilja",
    recipes: [
      "https://recept.se/recept/heta-rakor-med-vitlok-chili-och-persilja",
      "https://www.mytaste.se/recept/heta-r%C3%A4kor-med-vitl%C3%B6k-chili-och-persilja-963788139",
      "https://www.matklubben.se/recept/heta-raekor-med-chiliflakes-vitloek-och-persilja-121551",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/hetarakor.avif",
  },
  {
    title: "Kyckling- och bacongratäng med ris",
    recipes: [
      "https://recept.se/recept/kyckling-och-bacongratang-pa-risbadd",
      "https://www.pinterest.se/pin/863776403513142488/",
      "https://www.niiinis.se/2020/05/16/kyckling-och-bacongratang/",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/kycklingbacon.avif",
  },
  {
    title: "Fisksoppa",
    recipes: [
      "https://www.ica.se/recept/fiskarhustruns-fisksoppa-3760/",
      "https://www.mathem.se/recept/saffranskryddad-fisksoppa-med-lax-och-torsk",
      "https://recept.se/recept/kramig-fisksoppa-med-rakor-dill-och-citron",
    ],
    imageUrl:
      "https://menuapp-bucket.s3.eu-north-1.amazonaws.com/fisksoppa.jpeg",
  },
];

export { AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, MEALS, INGREDIENTS, RECIPES };
