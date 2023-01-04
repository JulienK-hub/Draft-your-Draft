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
    let ruleCondition2 = {pos: "P1",champ: "Aatrox"};
    let draftTab1 = [{pos: "B1",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P1",champ: "Supp"},{pos: "B1",champ: "Nautilus"}];
    let draftTab2 = [{pos: "B1",champ: "Renekton"},{pos: "B5",champ: "Supp"},{pos: "B2",champ: "Ashe"},{pos: "P3",champ: "Adc"}];
    let draftTab3 = [{pos: "B4",champ: "Lissandra"},{pos: "B3",champ: "Ahri"},{pos: "P5",champ: "mid"}];
    let draftTab4 = [{pos: "P2", champ: "Aatrox"}];
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

      // more tests
      test("27. Target is enemy / Tables don't correspond / Rule for blue / Draft is blue", () => { 
        expect(dll.checkCondition(ruleCondition2,"Moi","Both",draftTab2,draftTab4,"Both")).toEqual(false); 
      });
    });


    /* type 1 = "Moi" "Ennemi"
    *  type 2 = Label Champ et position "All" "B1" "B2" "B3" "B4" "B5" "P1" "P2" "P3" "P4" "P5" "Pick" "Ban"
    *  type 3 = "Alors Afficher"
    *  type 4 = "Ou" "Et"
    *  type 5 = "(" ")"
    */
    describe("computeRuleTest", () => {
      let ruleSide1 = "Blue"; // object isn't touched in the code so it's value isn't pertinente 

      let ruleTab1 = [{type: 1,text: "Moi"},{type: 2, pos: "B2",champ: "adc"},{type: 3, text: "ALors Afficher"},{type: 6,champ: "Faire attention aux HyperCarry"}];
      let ruleTab2 = [{type: 2, pos: "B2",champ: "adc"},{type: 3, text: "ALors Afficher"},{type: 6,champ: "Faire attention aux HyperCarry"}];
      let ruleTab3 = [{type: 1,text: "Both"},{type: 2, pos: "B2",champ: "adc"},{type: 3, text: "ALors Afficher"},{type: 6,champ: "Faire attention aux HyperCarry"}];
      let ruleTab4 = [{type: 1,text: "Moi"},{type: 5, text: "("},{type: 2, pos: "B2",champ: "adc"},{type: 4, text: "Ou"},{type: 2, pos: "All",champ: "Nautilus"},{type: 5, text: ")"},{type: 4, text: "Et"},{type: 2, pos: "Pick",champ: "Taric"},{type: 3, text: "ALors Afficher"},{type: 6,champ: "Faire attention aux HyperCarry"}];
      
      
      let res;
      let ruleSide = "";
      let ruleTarget = "";
      let champsTab = [];
      let displaysTab = [];
      test("1. target is Moi", () => {
        res = dll.computeRule(ruleTab1,ruleSide1);

        ruleSide = res.ruleSide;
        ruleTarget = res.ruleTarget;
        champsTab = res.champsTab;
        displaysTab = res.displaysTab;

        expect(ruleSide).toEqual("Blue"); 
        expect(ruleTarget).toEqual("Moi");
        expect(champsTab).toEqual([{pos:"B2", champ: "adc"}]);
        expect(displaysTab).toEqual([{type: 6,champ: "Faire attention aux HyperCarry"}]);
      });
      test("2. no target (equivalent to Both)", () => {
        res = dll.computeRule(ruleTab2,ruleSide1);

        ruleSide = res.ruleSide;
        ruleTarget = res.ruleTarget;
        champsTab = res.champsTab;
        displaysTab = res.displaysTab;

        expect(ruleSide).toEqual("Blue"); 
        expect(ruleTarget).toEqual("Both");
        expect(champsTab).toEqual([{pos:"B2", champ: "adc"}]);
        expect(displaysTab).toEqual([{type: 6,champ: "Faire attention aux HyperCarry"}]);
      });
      test("3. target is Both", () => { 
        res = dll.computeRule(ruleTab3,ruleSide1);

        ruleSide = res.ruleSide;
        ruleTarget = res.ruleTarget;
        champsTab = res.champsTab;
        displaysTab = res.displaysTab;

        expect(ruleSide).toEqual("Blue"); 
        expect(ruleTarget).toEqual("Both");
        expect(champsTab).toEqual([{pos:"B2", champ: "adc"}]);
        expect(displaysTab).toEqual([{type: 6,champ: "Faire attention aux HyperCarry"}]); 
      });
      test("4. integration test", () => { 
        res = dll.computeRule(ruleTab4,ruleSide1);

        ruleSide = res.ruleSide;
        ruleTarget = res.ruleTarget;
        champsTab = res.champsTab;
        displaysTab = res.displaysTab;

        expect(ruleSide).toEqual("Blue"); 
        expect(ruleTarget).toEqual("Moi");
        expect(champsTab).toEqual([{pos:"B2", champ: "adc"},{pos:"All", champ: "Nautilus"},{pos:"Pick", champ: "Taric"}]);
        expect(displaysTab).toEqual([{type: 6,champ: "Faire attention aux HyperCarry"}]);
      });
    }),

    describe("checkRuleTest", () => {
      let ruleSide1 = "Blue"; 
      let ruleTarget1 = "Moi";

      let ruleTab1 = [{type: 2,value:{pos: "B1",champ: "Nautilus"}}];
      let ruleTab2 = [{type: 2,value:{pos: "B5",champ: "Supp"}}];
      let ruleTab3 = [{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Ou"},{type: 2,value:{pos: "B1",champ: "Teemo"}}];
      let ruleTab4 = [{type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 4,value:"Ou"},{type: 2,value:{pos: "B1",champ: "Nautilus"}}];
      let ruleTab5 = [{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Et"},{type: 2,value:{pos: "B2",champ: "Teemo"}}];
      let ruleTab6 = [{type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 4,value:"Et"},{type: 2,value:{pos: "B1",champ: "Nautilus"}}];
      let ruleTab7 = [{type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 4,value:"Ou"},{type: 2,value:{pos: "P5",champ: "Aatrox"}},{type: 4,value:"Ou"},{type: 2,value:{pos: "B1",champ: "Nautilus"}}];
      let ruleTab8 = [{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Et"},{type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 4,value:"Et"},{type: 2,value:{pos: "P2",champ: "Aatrox"}}];
      let ruleTab9 = [{type: 2,value:{pos: "P3",champ: "Ashe"}},{type: 4,value:"Ou"},{type: 5,value:"("},{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Et"}, {type: 2,value:{pos: "B2",champ: "Teemo"}},{type: 5,value:")"}];
      let ruleTab10 = [{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Ou"},{type: 5,value:"("},{type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 4,value:"Et"}, {type: 2,value:{pos: "P2",champ: "Aatrox"}},{type: 5,value:")"}];
      let ruleTab11 = [{type: 2,value:{pos: "P3",champ: "Ashe"}},{type: 4,value:"Et"},{type: 5,value:"("},{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Ou"}, {type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 5,value:")"}];
      let ruleTab12 = [{type: 2,value:{pos: "B1",champ: "Nautilus"}},{type: 4,value:"Et"},{type: 5,value:"("},{type: 2,value:{pos: "B1",champ: "Teemo"}},{type: 4,value:"Ou"}, {type: 2,value:{pos: "P2",champ: "Aatrox"}},{type: 5,value:")"}];
      

      let displaysTab1 = []; // à retirer
      let draftBTab1 = [{pos: "B1",champ: "Nautilus"}];
      let draftBTab2 = [{pos: "B1",champ: "Nautilus"}, {pos: "B2",champ: "Teemo"}];
      let draftBTab3 = [{pos: "P1",champ: "Nautilus"}];
      let draftBTab4 = [{pos: "B1",champ: "Nautilus"}, {pos: "B1",champ: "Teemo"},{pos: "P2",champ: "Aatrox"}];
      let draftBTab5 = [{pos: "B1",champ: "Nautilus"}, {pos: "B1",champ: "Teemo"},{pos: "P3",champ: "Ashe"}];
      
      let draftRTab1 = [{pos: "B5",champ: "Supp"}];
      let draftSide1 = "Blue";
      
        // Tests without parentheses 
        test("1. no operator (only one condition) => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab1,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("2. no operator (only one condition) => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab2,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("3. one Or: true || false => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab3,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("4. one Or: false || true => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab4,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("5. one Or: true || true => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab3,displaysTab1,draftBTab2,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("6. one Or: false || false => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab3,displaysTab1,draftBTab3,draftRTab1,draftSide1)).toEqual(false); 
        }); 
        test("7. one And: true && false => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab5,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("8. one And: false && true => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab6,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("9. one And: true && true => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab5,displaysTab1,draftBTab2,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("10. one And: false && false => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab5,displaysTab1,draftBTab3,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("11. many Or: false || false || true => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab7,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("12. many Or: false || false || false => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab7,displaysTab1,draftBTab3,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("13. many And: true && true && false => should return false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab8,displaysTab1,draftBTab2,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("14. many And: true && true && true => should return true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab8,displaysTab1,draftBTab4,draftRTab1,draftSide1)).toEqual(true); 
        });
        // Tests with parentheses 
        test("15. simple case parentheses: false || (true && true) => true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab9,displaysTab1,draftBTab2,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("16. simple case parentheses: true || (false && false) => true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab10,displaysTab1,draftBTab1,draftRTab1,draftSide1)).toEqual(true); 
        });
        test("17. simple case parentheses: false && (true || true) => false", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab11,displaysTab1,draftBTab2,draftRTab1,draftSide1)).toEqual(false); 
        });
        test("18. simple case parentheses: true && (true || true) => true", () => { 
          expect(dll.checkRule(ruleSide1,ruleTarget1,ruleTab12,displaysTab1,draftBTab5,draftRTab1,draftSide1)).toEqual(true); 
        });/*
        test("8. complexe case parentheses", () => { 
          expect(dll.checkRule(condition4,draftTab3)).toEqual(true); 
        });*/
      });