import dll from '../../src/components/DLL.js'

describe("compareTabsTest", () => {

  let tab1 = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P1",champ: "Supp"}];
  let tab2 = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P1",champ: "Supp"}];
  let tab3 = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P3",champ: "Adc"}];
  let tab4 = [{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"}];
  let tab5 = [{pos: "B1",champ: "Nautilus"},{pos: "P3",champ: "Supp"}];
// tester le "All" et affiner les tests pour tester tous les cas
    test("1. identical Tabs", () => { 
      expect(dll.CompareTabs(tab1,tab2)).toEqual(true); 
    });
    test("2. Small difference Tab1", () => { 
      expect(dll.CompareTabs(tab1,tab3)).toEqual(true); 
    });
    test("3. Small difference Tab2", () => { 
      expect(dll.CompareTabs(tab3,tab1)).toEqual(true); 
    });
    test("4. not same length tabs", () => { 
      expect(dll.CompareTabs(tab4,tab2)).toEqual(true); 
    });
    test("5. no match in tabs", () => { 
      expect(dll.CompareTabs(tab5,tab4)).toEqual(false); 
    });
  });

  describe("executorTest", () => {
      /**
     * ruleTab = [{pos: "P3",champ:"adc"},{pos: "P1",champ:"Teemo"},{pos: "All",champ:"aatrox"},{pos: "P3",champ:"supp"},]
     * draftBTab = [{pos: "B1",champ: "Aatrox"},{pos: "B1",champ: "Top"},{pos: "B2",champ: "Annie"},...,{pos: "P1",champ: "Top"}] => draft blue
     * draftRTab = [{pos: "B1",champ: "Nautilus"},{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},...,{pos: "P1",champ: "Supp"}] => draft red
     * ruleSide = "Blue" ou "Red" => side duquel la règle doit s'afficher  ~si "Both" l'executor exécute avec "Blue" et "Red"~
     * ruleTarget = "Moi" ou "Ennemi" ou "Both"
     * draftSide = "Blue" ou "Red" ou "Both" => side choisit par l'utilisateur
     */
    let ruleTab1 = [{pos: "All",champ: "Nautilus"}];
    let draftTab1 = [{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P1",champ: "Supp"},{pos: "B1",champ: "Nautilus"}];
    let draftTab2 = [{pos: "B1",champ: "Renekton"},{pos: "B5",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P3",champ: "Adc"}];
    let draftTab3 = [{pos: "B4",champ: "Lissandra"},{pos: "B3",champ: "Ahri"},{pos: "P5",champ: "mid"}];
  
      //target is me
          //blue draft corresponds
      test("1. Target is me / Blue draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Moi","Blue",draftTab1,draftTab2,"Red")).toEqual(false); 
      });
      test("2. Target is me / Blue draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Moi","Blue",draftTab1,draftTab2,"Blue")).toEqual(true); 
      });
      test("3. Target is me / Blue draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Moi","Red",draftTab1,draftTab2,"Blue")).toEqual(false); 
      });
      test("4. Target is me / Blue draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Moi","Red",draftTab1,draftTab2,"Red")).toEqual(false); 
      });
          //red draft corresponds
      test("5. Target is me / Red draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Moi","Blue",draftTab2,draftTab1,"Red")).toEqual(false); 
      });
      test("6. Target is me / Red draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Moi","Blue",draftTab2,draftTab1,"Blue")).toEqual(false); 
      });
      test("7. Target is me / Red draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Moi","Red",draftTab2,draftTab1,"Blue")).toEqual(false); 
      });
      test("8. Target is me / Red draft Corresponds / Rule for red / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Moi","Red",draftTab2,draftTab1,"Red")).toEqual(true); 
      });

      //target is enemy
          //blue draft corresponds
      test("9. Target is enemy / Blue draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Blue",draftTab1,draftTab2,"Red")).toEqual(false); 
      });
      test("10. Target is enemy / Blue draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Blue",draftTab1,draftTab2,"Blue")).toEqual(false); 
      });
      test("11. Target is enemy / Blue draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Red",draftTab1,draftTab2,"Blue")).toEqual(false); 
      });
      test("12. Target is enemy / Blue draft Corresponds / Rule for red / Draft is Red", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Red",draftTab1,draftTab2,"Red")).toEqual(true); 
      });
          //red draft corresponds
      test("13. Target is enemy / Red draft Corresponds / Rule for blue / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Blue",draftTab2,draftTab1,"Red")).toEqual(false); 
      });
      test("14. Target is enemy / Red draft Corresponds / Rule for blue / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Blue",draftTab2,draftTab1,"Blue")).toEqual(true); 
      });
      test("15. Target is enemy / Red draft Corresponds / Rule for red / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Red",draftTab2,draftTab1,"Blue")).toEqual(false); 
      });
      test("16. Target is enemy / Red draft Corresponds / Rule for red / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Red",draftTab2,draftTab1,"Red")).toEqual(false); 
      });

      // target is "Both"
      test("17. Target is both / Both drafts match", () => { 
        expect(dll.executor(ruleTab1,"Both","Red",draftTab1,draftTab1,"Red")).toEqual(true); 
      });
      test("18. Target is both / Blue draft matches", () => { 
        expect(dll.executor(ruleTab1,"Both","Blue",draftTab2,draftTab1,"Blue")).toEqual(true); 
      });
      test("19. Target is both / Red draft matches", () => { 
        expect(dll.executor(ruleTab1,"Both","Red",draftTab1,draftTab2,"Red")).toEqual(true); 
      });
      test("20. Target is both / None draft matches", () => { 
        expect(dll.executor(ruleTab1,"Both","Blue",draftTab2,draftTab3,"Blue")).toEqual(false); //Bug
      });

      // draftside is "Both" 
      test("21. Draft is both returning true", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Blue",draftTab1,draftTab2,"Both")).toEqual(false); 
      });
      test("22. Draft is both returning true", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Red",draftTab1,draftTab2,"Both")).toEqual(true); 
      });

      // some cases that shouldn't work because compareTabs() returns false
      test("23. Target is me / Tables don't correspond / Rule for blue / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Moi","Blue",draftTab3,draftTab2,"Blue")).toEqual(false); 
      });
      test("24. Target is me / Tables don't correspond / Rule for red / Draft is red", () => { 
        expect(dll.executor(ruleTab1,"Moi","Red",draftTab2,draftTab3,"Red")).toEqual(false); 
      });
      test("25. Target is enemy / Tables don't correspond / Rule for red / Draft is Red", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Red",draftTab3,draftTab2,"Red")).toEqual(false); 
      });
      test("26. Target is enemy / Tables don't correspond / Rule for blue / Draft is blue", () => { 
        expect(dll.executor(ruleTab1,"Ennemi","Blue",draftTab2,draftTab3,"Blue")).toEqual(false); 
      });
    });