import { resolveDirective } from "vue";

//Méthodes du langage dédié
var dll = {

    //ruleTab = [{text: "Moi" ,type: 1 },{text: "Pick" ,type: 2 },{text: "adc" ,type: 3 },{text: "en position P2" ,type: 4 },{text: "Alors afficher" ,type: 5 },{text: "pas mal" ,type: 3 },]
    compiler (ruleTab) { 
        console.log(ruleTab);
        return true;
    },

    /**
     * @param {any[]} ruleTab = [{pos: "P3",champ:"adc"},{pos: "P1",champ:"Teemo"},{pos: "All",champ:"aatrox"},{pos: "P3",champ:"supp"},]
     * @param {String} ruleTarget = "Moi" ou "Ennemi" ou "Both" 
     * @param {String} ruleSide = "Blue" ou "Red" => side duquel la règle doit s'afficher  ~si "Both" l'executeur exécute avec "Blue" et "Red"~
     * @param {any[]} draftBTab = [{pos: "B1",champ: "Aatrox"},{pos: "B1",champ: "Top"},{pos: "B2",champ: "Annie"},...,{pos: "P1",champ: "Top"}] => draft blue
     * @param {any[]} draftRTab = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},...,{pos: "P1",champ: "Supp"}] => draft red
     * @param {String} draftSide = "Blue" ou "Red" ou "Both" => side choisi par l'utilisateur
     * @returns {boolean} True ou False selon si la règle est appliquée
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
            this.com
        });
        return res;
    },
    /**
     * @param {any[]} ruleTab la règle de la RulePage validée par le compilateur
     * @returns {any[]} le/les tableaux de règles sous le format lisible par l'exécuteur
     *  type 1 = "Moi" "Ennemi"
     *  type 2 = Label Champ et position "All" "B1" "B2" "B3" "B4" "B5" "P1" "P2" "P3" "P4" "P5" "Pick" "Ban"
     *  type 3 = "Alors Afficher"
     *  type 4 = "Ou" "Et"
     *  type 5 = "(" ")"
     */
    ComputeRule(ruleTab,ruleSide){
        var index = 0;
        var displaysTab;
        const ruleTarget = ruleTab[0].text;

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
                if (element.pos === "Ban"){
                    champsTab.push({pos: "B1", champ: element.champ},{pos: "B2", champ: element.champ},{pos: "B3", champ: element.champ},{pos: "B4", champ: element.champ},{pos: "B5", champ: element.champ});
                    parenthesesTab.push(0,0,0,0,0);
                    operatorsTab.push("Ou","Ou","Ou","Ou");
                }
                else if (element.pos === "Pick"){
                    champsTab.push({pos: "P1", champ: element.champ},{pos: "P2", champ: element.champ},{pos: "P3", champ: element.champ},{pos: "P4", champ: element.champ},{pos: "P5", champ: element.champ});
                    parenthesesTab.push(0,0,0,0,0);
                    operatorsTab.push("Ou","Ou","Ou","Ou");
                }
                else if (element.pos === "All"){ 
                    champsTab.push({pos: "B1", champ: element.champ},{pos: "B2", champ: element.champ},{pos: "B3", champ: element.champ},{pos: "B4", champ: element.champ},{pos: "B5", champ: element.champ},{pos: "P1", champ: element.champ},{pos: "P2", champ: element.champ},{pos: "P3", champ: element.champ},{pos: "P4", champ: element.champ},{pos: "P5", champ: element.champ});
                    parenthesesTab.push(0,0,0,0,0,0,0,0,0,0);
                    operatorsTab.push("Ou","Ou","Ou","Ou","Ou","Ou","Ou","Ou","Ou");
                }
                else{
                    champsTab.push({pos: element.pos, champ: element.champ});
                    parenthesesTab.push(0);
                }
            }
            else if (element.type === 4){
                operatorsTab.push(element.text);
            }
        });
        return [champsTab,parenthesesTab,operatorsTab];
    },

    /**
     * [0,0,1,0,2,0,2,1] besoin de sauver l'opérateur
     * @param {*} ruleTab 
     */
    /*
    getParenthesesTab(ruleTab){
        res = [];
        parentheseIndex = 0;
        numberItemsBeetwenParentheses = 0;
        i;
        while(parentheseMaxIndex >= 0){
            champsTab.forEach(item => {
                if (item.text === "("){
                    parentheseIndex++;
                }
                else if (item.text === ")"){
                    parentheseIndex--;
                }
                if(parentheseIndex >= parentheseMaxIndex){
                    numberItemsBeetwenParentheses++;
                }
            });
            parentheseMaxIndex--;
        }
    }**/
  }




export default dll