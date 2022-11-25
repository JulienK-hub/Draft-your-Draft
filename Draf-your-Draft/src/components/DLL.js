var dll = {

    //ruleTab = ruleTab = [{text: "Moi" ,type: 1 },{text: "Pick" ,type: 2 },{text: "adc" ,type: 3 },{text: "en position P2" ,type: 4 },{text: "Alors afficher" ,type: 5 },{text: "pas mal" ,type: 3 },]
    compiler (ruleTab) { 
        console.log(ruleTab);
        return true;
    },

    /**
     * ruleTab = [{pos: "P3",champ:"adc"},{pos: "P1",champ:"Teemo"},{pos: "All",champ:"aatrox"},{pos: "P3",champ:"supp"},]
     * draftBTab = [{pos: "B1",champ: Aatrox},{pos: "B1",champ: Top},{pos: "B2",champ: Annie},...,{pos: "P1",champ: Top}] => draft blue
     * draftRTab = [{pos: "B1",champ: Nautilus},{pos: "B1",champ: Supp},{pos: "B2",champ: Ashe},...,{pos: "P1",champ: Supp}] => draft red
     * ruleSide = "Blue" ou "Red" => side duquel la règle doit s'afficher  ~si "Both" l'executor exécute avec "Blue" et "Red"~
     * ruleTarget = "Moi" ou "Ennemi" ou "Both"
     * draftSide = "Blue" ou "Red" ou "Both" => side choisit par l'utilisateur
     */
    executor(ruleTab,ruleTarget,ruleSide,draftBTab,draftRTab,draftSide){
        if(ruleSide !== draftSide && draftSide !== "Both"){ // traitement du side
            return false;
        }
        if(ruleTarget === "Both"){ // la règle s'applique aux 2 sides donc on ne regarde pas ruleSide ("Moi ou Ennemi" / Ennemi ou Moi")
            if(!CompareTabs(ruleTab,draftBTab) || !CompareTabs(ruleTab,draftRTab)){
                return false;
            }
        }
        else if(ruleSide === "Blue"){
            if(ruleTarget === "Moi"){
                return CompareTabs(ruleTab,draftBTab);
            }
            else{
                return CompareTabs(ruleTab,draftRTab);
            }
        }
        else if (ruleSide === "Red"){
            if(ruleTarget === "Moi"){
                return CompareTabs(ruleTab,draftRTab);
            }
            else{
                return CompareTabs(ruleTab,draftBTab);
            }
        }
        return true;
    }
  }

/**
 * returns true if rule can be applied
 */
function CompareTabs(ruleTab,draftTab){
    draftTab.forEach(pickedChamp => {
        ruleTab.forEach(rule =>{
            if(pickedChamp.champ === rule.champ ){
                if(rule.pos === "All"){
                    return true;
                }
                else{
                    if(pickedChamp.pos === rule.pos){
                        return true
                    }
                }
            }
        })
    });
    return false;
}


export default dll