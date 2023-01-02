import { resolveDirective } from "vue";

class tree {
    operator;
    left_op;
    right_op;
    

    constructor(operator,left_op,right_op){
        this.operator = operator;
        this.left_op = left_op;
        if ((operator == "Ou") || (operator == "Et")) this.right_op = right_op;
    }
    
    resolve(ruleTarget,ruleSide,draftBTab,draftRTab,draftSide){
        switch (this.operator){
            case "Ou":
                return this.left_op.resolve(ruleTarget,ruleSide,draftBTab,draftRTab,draftSide) || this.right_op.resolve(ruleTarget,ruleSide,draftBTab,draftRTab,draftSide)
            case "Et":
                return this.left_op.resolve(ruleTarget,ruleSide,draftBTab,draftRTab,draftSide) && this.right_op.resolve(ruleTarget,ruleSide,draftBTab,draftRTab,draftSide)
            case "Element":
                return dll.checkCondition(this.left_op,ruleTarget,ruleSide,draftBTab,draftRTab,draftSide);
        }

    }
}
//Méthodes du langage dédié
var dll = {

    compiler (ruleTab) { 
        console.log(ruleTab);
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
        if(!dll.isConditionDoable(ruleSide,draftSide)){
            return false
        }
        else if(ruleTarget === "Both" || ruleSide === "Both"){ // la règle s'applique aux 2 sides
            return (dll.compareTabs(condition,draftBTab) || dll.compareTabs(condition,draftRTab));
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
    },
    /**
     * returns true if we can apply the condition
     */
    isConditionDoable(ruleSide,draftSide){
        return ruleSide === draftSide || ruleSide === "Both" || draftSide === "Both"; 
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
        var champsTab = [];
        var ruleTarget = "";
        

        ruleTab.every(item =>{ // using .every() is equivalent to .forEach() but we can stop iterating with "return false;"
            
            if(item.type === 3){
                displaysTab = ruleTab.slice(index+1);
                
                if(ruleTab[0].type !== 1){ // if target not mentionned
                    ruleTarget = "Both";
                    champsTab = ruleTab.slice(0,index);
                }
                else{ //   if target is "Moi" or "Ennemi" or "Both"
                    champsTab = ruleTab.slice(1,index);
                    ruleTarget =  ruleTab[0].value;
                }
                return false;
            }
            index++;
            return true
        })
        
        return {ruleSide: ruleSide ,ruleTarget: ruleTarget,champsTab: champsTab,displaysTab: displaysTab};
    },

    buildTree(ruleTab){
        //console.log(ruleTab);
        if (ruleTab.length ===1){ // If element alone, just resolve
            if (ruleTab[0].type === 2){
                console.log("Case 1 \n\r");
                return new tree("Element",ruleTab[0].value,null)
            }else{
                console.log("Error : Invalid equation 1 \n\r");
                return 0
            }
        }
        else if ((ruleTab[0].type === 5)&&(ruleTab[0].value==="(")&&(ruleTab[ruleTab.length-1].type === 5)&&(ruleTab[ruleTab.length-1].value===")")){ //If parenthesis around ,resolve equation inside
            console.log("Case 2 \n\r");
            return this.buildTree(ruleTab.slice(1,-1));
        }else{
            console.log("Case 3 \n\r");
            var parentheseIndex = 0;
            for (let i =0;i <ruleTab.length;i++){
                if(ruleTab[i].type === 5){ 
                    if(ruleTab[i].value === "("){
                        parentheseIndex++;
                    }
                    else{
                        parentheseIndex--;
                    }
                } 
                if((ruleTab[i].type === 4)&&(parentheseIndex===0)){
                    var left_tree = this.buildTree(ruleTab.slice(0,i));
                    var right_tree = this.buildTree(ruleTab.slice(i+1));
                    var top_tree = new tree(ruleTab[i].value,left_tree,right_tree);
                    return top_tree;
                }
            };
            console.log("Error : Invalid equation 2 \n\r");
            return null;
        }

            

    },

    checkRule(ruleSide,ruleTarget,ruleTab,displaysTab,draftBTab,draftRTab,draftSide){
        console.log("Check Rule");
        var rule_tree = this.buildTree(ruleTab);
        console.log(rule_tree);
        return rule_tree.resolve(ruleTarget,ruleSide,draftBTab,draftRTab,draftSide);
    }, 

  }




export default dll