import dll from '../../src/components/DLL.js'

describe("compareTabsTest", () => {

  let condition1 = {pos: "Pick",champ: "Nautilus"};
  let condition2 = {pos: "Ban",champ: "Nautilus"};
  let condition3 = {pos: "All",champ: "Nautilus"};
  let condition4 = {pos: "P2",champ: "Nautilus"};
  let draftTab1 = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P3",champ: "Adc"}];
  let draftTab2 = [{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P3",champ: "Adc"},{pos: "P1",champ: "Nautilus"}];
  let draftTab3 = [{pos: "P2",champ: "Nautilus"}];

    test("1. pos is Pick", () => { 
      expect(dll.compareTabs(condition1,draftTab2)).toEqual(true); 
    });
    test("2. pos is Ban", () => { 
      expect(dll.compareTabs(condition2,draftTab1)).toEqual(true); 
    });
    test("3. pos is All", () => { 
      expect(dll.compareTabs(condition3,draftTab1)).toEqual(true); 
    });
    test("4. pos is P2", () => { 
      expect(dll.compareTabs(condition4,draftTab3)).toEqual(true); 
    });
    test("5. no match in tab", () => { 
      expect(dll.compareTabs(condition4,draftTab1)).toEqual(false); 
    });
  });
/*
  *  type 1 = "Moi" "Ennemi"
  *  type 2 = Label Champ et position "All" "B1" "B2" "B3" "B4" "B5" "P1" "P2" "P3" "P4" "P5" "Pick" "Ban"
  *  type 3 = "Alors Afficher"
  *  type 4 = "Ou" "Et"
  *  type 5 = "(" ")"
  */
  describe("getChampsAndParenthesesTabTest", () => {

    let tab1 = [{text: "Moi" ,type: 1 },{pos: "P1",champ: "Aatrox" ,type: 2 }];
    let tab2 = [{text: "Ennemi" ,type: 1 },{pos: "Pick",champ: "Nautilus" ,type: 2 }];
    let tab3 = [{text: "Moi" ,type: 1 },{pos: "Ban",champ: "Teemo" ,type: 2 }];
    let tab4 = [{text: "Ennemi" ,type: 1 },{pos: "All",champ: "Kai'sa" ,type: 2 }];
    let tab5 = [{text: "Moi" ,type: 1 },{pos: "P2",champ: "Aatrox" ,type: 2 },{text: "ou" ,type: 4 },{pos: "B1",champ: "Aatrox" ,type: 2},{text: "et" ,type: 4 },{text: "(" ,type: 5 },{pos: "P3",champ: "Nautilus" ,type: 2 },{text: "ou" ,type: 4 },{text: "(" ,type: 5 },{pos: "B2",champ: "Akali" ,type: 2 },{text: ")" ,type: 5 },{text: ")" ,type: 5 }];

    let tabRes1 = [];
    let tabRes2 = [];
    let tabRes3 = [];
    let res = [];
      test("1. One champ in pos P1", () => {
        res = dll.getChampsAndParenthesesTab(tab1);
        tabRes1 = res[0];
        tabRes2 = res[1];
        tabRes3 = res[2];
        expect(tabRes1).toEqual([{pos: "P1",champ: "Aatrox"}]); 
        expect(tabRes2).toEqual([0]);
        expect(tabRes3).toEqual([]);
      });
      test("2. One champ in pos 'Pick'", () => {
        res = dll.getChampsAndParenthesesTab(tab2);
        tabRes1 = res[0];
        tabRes2 = res[1];
        tabRes3 = res[2];
        expect(tabRes1).toEqual([{pos: "Pick",champ: "Nautilus"}]); 
        expect(tabRes2).toEqual([0]);
        expect(tabRes3).toEqual([]);
      });
      test("3. One champ in pos 'Ban'", () => {
        res = dll.getChampsAndParenthesesTab(tab3);
        tabRes1 = res[0];
        tabRes2 = res[1];
        tabRes3 = res[2];
        expect(tabRes1).toEqual([{pos: "Ban",champ: "Teemo"}]); 
        expect(tabRes2).toEqual([0]);
        expect(tabRes3).toEqual([]);
      });
      test("4. One champ in pos 'All'", () => {
        let res = dll.getChampsAndParenthesesTab(tab4);
        tabRes1 = res[0];
        tabRes2 = res[1];
        tabRes3 = res[2];
        expect(tabRes1).toEqual([{pos: "All",champ: "Kai'sa"}]); 
        expect(tabRes2).toEqual([0]);
        expect(tabRes3).toEqual([]);
      });
      test("5. multi champ multi parentheses", () => {
        let res = dll.getChampsAndParenthesesTab(tab5);
        tabRes1 = res[0];
        tabRes2 = res[1];
        tabRes3 = res[2];
        expect(tabRes1).toEqual([{pos: "P2",champ: "Aatrox"},{pos: "B1",champ: "Aatrox"},{pos: "P3",champ: "Nautilus"},{pos: "B2",champ: "Akali"}]); 
        expect(tabRes2).toEqual([0,0,1,0,2,0,2,1]);
        expect(tabRes3).toEqual(["ou","et","ou"]);
      });
    });

  describe("checkConditionTest", () => {
      /**
     * ruleCondition = [{pos: "P3",champ:"adc"},{pos: "P1",champ:"Teemo"},{pos: "All",champ:"aatrox"},{pos: "P3",champ:"supp"},]
     * draftBTab = [{pos: "B1",champ: "Aatrox"},{pos: "B1",champ: "Top"},{pos: "B2",champ: "Annie"},...,{pos: "P1",champ: "Top"}] => draft blue
     * draftRTab = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},...,{pos: "P1",champ: "Supp"}] => draft red
     * ruleSide = "Blue" ou "Red" => side duquel la règle doit s'afficher  ~si "Both" l'executor exécute avec "Blue" et "Red"~
     * ruleTarget = "Moi" ou "Ennemi" ou "Both"
     * draftSide = "Blue" ou "Red" ou "Both" => side choisit par l'utilisateur
     */
    let ruleCondition1 = {pos: "All",champ: "Nautilus"};
    let draftTab1 = [{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P1",champ: "Supp"},{pos: "B1",champ: "Nautilus"}];
    let draftTab2 = [{pos: "B1",champ: "Renekton"},{pos: "B5",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P3",champ: "Adc"}];
    let draftTab3 = [{pos: "B4",champ: "Lissandra"},{pos: "B3",champ: "Ahri"},{pos: "P5",champ: "mid"}];
  
      //target is me
          //blue draft corresponds
      test("1. Target is me / Blue draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Blue",draftTab1,draftTab2,"Red")).toEqual(false); 
      });
      test("2. Target is me / Blue draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Blue",draftTab1,draftTab2,"Blue")).toEqual(true); 
      });
      test("3. Target is me / Blue draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Red",draftTab1,draftTab2,"Blue")).toEqual(false); 
      });
      test("4. Target is me / Blue draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Red",draftTab1,draftTab2,"Red")).toEqual(false); 
      });
          //red draft corresponds
      test("5. Target is me / Red draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Blue",draftTab2,draftTab1,"Red")).toEqual(false); 
      });
      test("6. Target is me / Red draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Blue",draftTab2,draftTab1,"Blue")).toEqual(false); 
      });
      test("7. Target is me / Red draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Red",draftTab2,draftTab1,"Blue")).toEqual(false); 
      });
      test("8. Target is me / Red draft Corresponds / Rule for red / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Red",draftTab2,draftTab1,"Red")).toEqual(true); 
      });

      //target is enemy
          //blue draft corresponds
      test("9. Target is enemy / Blue draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Blue",draftTab1,draftTab2,"Red")).toEqual(false); 
      });
      test("10. Target is enemy / Blue draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Blue",draftTab1,draftTab2,"Blue")).toEqual(false); 
      });
      test("11. Target is enemy / Blue draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Red",draftTab1,draftTab2,"Blue")).toEqual(false); 
      });
      test("12. Target is enemy / Blue draft Corresponds / Rule for red / Draft is Red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Red",draftTab1,draftTab2,"Red")).toEqual(true); 
      });
          //red draft corresponds
      test("13. Target is enemy / Red draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Blue",draftTab2,draftTab1,"Red")).toEqual(false); 
      });
      test("14. Target is enemy / Red draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Blue",draftTab2,draftTab1,"Blue")).toEqual(true); 
      });
      test("15. Target is enemy / Red draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Red",draftTab2,draftTab1,"Blue")).toEqual(false); 
      });
      test("16. Target is enemy / Red draft Corresponds / Rule for red / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Red",draftTab2,draftTab1,"Red")).toEqual(false); 
      });

      // target is "Both"
      test("17. Target is both / Both drafts match", () => { 
        expect(dll.checkCondition(ruleCondition1,"Both","Red",draftTab1,draftTab1,"Red")).toEqual(true); 
      });
      test("18. Target is both / Blue draft matches", () => { 
        expect(dll.checkCondition(ruleCondition1,"Both","Blue",draftTab2,draftTab1,"Blue")).toEqual(true); 
      });
      test("19. Target is both / Red draft matches", () => { 
        expect(dll.checkCondition(ruleCondition1,"Both","Red",draftTab1,draftTab2,"Red")).toEqual(true); 
      });
      test("20. Target is both / None draft matches", () => { 
        expect(dll.checkCondition(ruleCondition1,"Both","Blue",draftTab2,draftTab3,"Blue")).toEqual(false); //Bug
      });

      // draftside is "Both" 
      test("21. Draft is both returning true", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Blue",draftTab1,draftTab2,"Both")).toEqual(false); 
      });
      test("22. Draft is both returning true", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Red",draftTab1,draftTab2,"Both")).toEqual(true); 
      });

      // some cases that shouldn't work because compareTabs() returns false
      test("23. Target is me / Tables don't correspond / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Blue",draftTab3,draftTab2,"Blue")).toEqual(false); 
      });
      test("24. Target is me / Tables don't correspond / Rule for red / Draft is red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Moi","Red",draftTab2,draftTab3,"Red")).toEqual(false); 
      });
      test("25. Target is enemy / Tables don't correspond / Rule for red / Draft is Red", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Red",draftTab3,draftTab2,"Red")).toEqual(false); 
      });
      test("26. Target is enemy / Tables don't correspond / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition1,"Ennemi","Blue",draftTab2,draftTab3,"Blue")).toEqual(false); 
      });
    });
    describe("computeRuleTest", () => {
    })