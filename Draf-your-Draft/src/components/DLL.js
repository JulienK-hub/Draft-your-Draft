import { resolveDirective } from "vue";

//Méthodes du langage dédié
var dll = {

    //ruleTab = [{text: "Moi" ,type: 1 },{text: "Pick" ,type: 2 },{text: "adc" ,type: 3 },{text: "en position P2" ,type: 4 },{text: "Alors afficher" ,type: 5 },{text: "pas mal" ,type: 3 },]
    compiler (ruleTab) { 
        console.log(ruleTab);
        return true;
    },

    checkRule(ruleSide , ruleTarget, champsTab, parenthesesTab, operatorsTab, displaysTab,draftBTab,draftRTab,draftSide){
        dll.checkCondition(condition,ruleTarget,ruleSide,draftBTab,draftRTab,draftSide);
        return true;
    },

    /**
     * @param {any[]} condition = {pos: "P3",champ:"adc"}
     * @param {String} ruleTarget = "Moi" ou "Ennemi" ou "Both" 
     * @param {String} ruleSide = "Blue" ou "Red" => side duquel la règle doit s'afficher  ~si "Both" l'executeur exécute avec "Blue" et "Red"~
     * @param {any[]} draftBTab = [{pos: "B1",champ: "Aatrox"},{pos: "B1",champ: "Top"},{pos: "B2",champ: "Annie"},...,{pos: "P1",champ: "Top"}] => draft blue
     * @param {any[]} draftRTab = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},...,{pos: "P1",champ: "Supp"}] => draft red
     * @param {String} draftSide = "Blue" ou "Red" ou "Both" => side choisi par l'utilisateur
     * @returns {boolean} True ou False selon si la règle est appliquée
     */
    checkCondition(condition,ruleTarget,ruleSide,draftBTab,draftRTab,draftSide){
        if(ruleSide !== draftSide && draftSide !== "Both"){ // traitement du side
            return false;
        }
        if(ruleTarget === "Both"){ // la règle s'applique aux 2 sides donc on ne regarde pas ruleSide ("Moi ou Ennemi" / Ennemi ou Moi")
            return dll.compareTabs(condition,draftBTab) || dll.compareTabs(condition,draftRTab)
        }
        else if(ruleSide === "Blue"){
            if(ruleTarget === "Moi"){
                return dll.compareTabs(condition,draftBTab);
            }
            else{
                return dll.compareTabs(condition,draftRTab);
            }
        }
        else if (ruleSide === "Red"){
            if(ruleTarget === "Moi"){
                return dll.compareTabs(condition,draftRTab);
            }
            else{
                return dll.compareTabs(condition,draftBTab);
            }
        }
        return true;
    },
    /**
     * returns true if one condition from ruleTard
     */
    compareTabs(condition,draftTab){
        var res = false;
        draftTab.forEach(pickedChamp => {
            if(pickedChamp.champ === condition.champ ){
                
                if(condition.pos === "All"){
                    res = true;
                }
                else if (condition.pos === "Pick"){
                    if(pickedChamp.pos === "P1" || pickedChamp.pos === "P2" || pickedChamp.pos === "P3" || pickedChamp.pos === "P4" || pickedChamp.pos === "P5"){
                        res = true;
                    }
                }
                else if (condition.pos === "Ban"){
                    if(pickedChamp.pos === "B1" || pickedChamp.pos === "B2" || pickedChamp.pos === "B3" || pickedChamp.pos === "B4" || pickedChamp.pos === "B5"){
                        res = true;
                    }
                }
                else{
                    if(pickedChamp.pos === condition.pos){
                        res = true;
                    }
                }
            }
        });
        return res;
    },
    /**
     * @param {any[]} ruleTab la règle de la RulePage validée par le compilateur
     * @returns {object} toutes les information sur la règle, triées et lisibles par l'exécuteur
     *  type 1 = "Moi" "Ennemi"
     *  type 2 = Label Champ et position "All" "B1" "B2" "B3" "B4" "B5" "P1" "P2" "P3" "P4" "P5" "Pick" "Ban"
     *  type 3 = "Alors Afficher"
     *  type 4 = "Ou" "Et"
     *  type 5 = "(" ")"
     */
    computeRule(ruleTab,ruleSide){
        var index = 0;
        var displaysTab = [];
        var conditionsTab = [];
        var ruleTarget = "";
        
        if(ruleTab[0].type !== 1){ // if target not mentionned
            ruleTarget = "Both";
        }
        else{ //   if target is "Moi" or "Ennemi" or "Both"
            ruleTarget =  ruleTab[0].text;
        }

        ruleTab.every(item =>{ // using .every() is equivalent to .forEach() but we can stop iterating with "return false;"
            
            if(item.type === 3){
                displaysTab = ruleTab.slice(index+1);
                conditionsTab = ruleTab.slice(0,index);
                return false;
            }
            index++;
            return true
        })
        var temp = dll.getChampsAndParenthesesTab(conditionsTab);
        const champsTab = temp[0];
        const parenthesesTab = temp[1];
        const operatorsTab = temp[2];
        return {ruleSide: ruleSide ,ruleTarget: ruleTarget,champsTab: champsTab,parenthesesTab: parenthesesTab,operatorsTab: operatorsTab,displaysTab: displaysTab};
    },

    getChampsAndParenthesesTab(ruleTab){
        var champsTab = [];
        var operatorsTab = [];
        var parenthesesTab = [];
        var parentheseIndex = 0;
        ruleTab.forEach(element => {
            // get the deepest parenthèse number;
            if(element.type === 5){ 
                if(element.text === "("){
                    parentheseIndex++;
                    parenthesesTab.push(parentheseIndex);
                }
                else{
                    parenthesesTab.push(parentheseIndex);
                    parentheseIndex--;
                }
                
            }
            else if( element.type === 2){
                parenthesesTab.push(0);
                if (element.pos === "Ban"){
                    champsTab.push({pos: "Ban", champ: element.champ});
                }
                else if (element.pos === "Pick"){
                    champsTab.push({pos: "Pick", champ: element.champ});
                }
                else if (element.pos === "All"){ 
                    champsTab.push({pos: "All", champ: element.champ});
                }
                else{
                    champsTab.push({pos: element.pos, champ: element.champ});
                    
                }
            }
            else if (element.type === 4){
                operatorsTab.push(element.text);
            }
        });
        return [champsTab,parenthesesTab,operatorsTab];
    },
  }




export default dll