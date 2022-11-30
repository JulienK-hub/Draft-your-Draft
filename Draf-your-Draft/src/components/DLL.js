//Méthodes du langage dédié
var dll = {

    //ruleTab = ruleTab = [{text: "Moi" ,type: 1 },{text: "Pick" ,type: 2 },{text: "adc" ,type: 3 },{text: "en position P2" ,type: 4 },{text: "Alors afficher" ,type: 5 },{text: "pas mal" ,type: 3 },]
    compiler (ruleTab) { 
        console.log(ruleTab);
        return true;
    },

    /**
     * ruleTab = [{pos: "P3",champ:"adc"},{pos: "P1",champ:"Teemo"},{pos: "All",champ:"aatrox"},{pos: "P3",champ:"supp"},]
     * draftBTab = [{pos: "B1",champ: "Aatrox"},{pos: "B1",champ: "Top"},{pos: "B2",champ: "Annie"},...,{pos: "P1",champ: "Top"}] => draft blue
     * draftRTab = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},...,{pos: "P1",champ: "Supp"}] => draft red
     * ruleSide = "Blue" ou "Red" => side duquel la règle doit s'afficher  ~si "Both" l'executeur exécute avec "Blue" et "Red"~
     * ruleTarget = "Moi" ou "Ennemi" ou "Both"
     * draftSide = "Blue" ou "Red" ou "Both" => side choisi par l'utilisateur
     */
    executor(ruleTab,ruleTarget,ruleSide,draftBTab,draftRTab,draftSide){
        if(ruleSide !== draftSide && draftSide !== "Both"){ // traitement du side
            return false;
        }
        if(ruleTarget === "Both"){ // la règle s'applique aux 2 sides donc on ne regarde pas ruleSide ("Moi ou Ennemi" / Ennemi ou Moi")
            return dll.CompareTabs(ruleTab,draftBTab) || dll.CompareTabs(ruleTab,draftRTab)
        }
        else if(ruleSide === "Blue"){
            if(ruleTarget === "Moi"){
                return dll.CompareTabs(ruleTab,draftBTab);
            }
            else{
                return dll.CompareTabs(ruleTab,draftRTab);
            }
        }
        else if (ruleSide === "Red"){
            if(ruleTarget === "Moi"){
                return dll.CompareTabs(ruleTab,draftRTab);
            }
            else{
                return dll.CompareTabs(ruleTab,draftBTab);
            }
        }
        return true;
    },
    /**
     * returns true if rule can be applied
     */
    CompareTabs(ruleTab,draftTab){
        var res = false;
        draftTab.forEach(pickedChamp => {
            ruleTab.forEach(rule =>{
                if(pickedChamp.champ === rule.champ ){
                    if(rule.pos === "All"){
                        res = true;
                    }
                    else{
                        
                        if(pickedChamp.pos === rule.pos){
                            res = true;
                        }
                    }
                }
            })
        });
        return res;
    }
  }




export default dll