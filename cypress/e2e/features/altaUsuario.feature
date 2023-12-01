
Feature: Alta de Usuarios

    Feature con escenario para validar el alta y baja de usuarios, 
    se validan los mensajes de alerta correspondientes en caso de 
    que falte completar alguno de los campos obligatorios o se que
    estos se completen con valores inválidos.  
    
    Scenario: Validar los mensajes indicativos al no completar ningun campo
        Given Ingreso a la página de creacion de usuario
        When Presiono el botón Cadastar
        Then Para el campo indicado visualizo la alerta esperada
            |nombreCampo    |mensaje                        |
            |nombre         |O campo Nome é obrigatório.    |
            |email          |O campo E-mail é obrigatório.  |
            |password       |O campo Senha é obrigatório.   |
    
    Scenario: Validar los mensajes indicativos al no completar el campo Nombre
        Given Ingreso a la página de creacion de usuario
        When Completo el formulario con los valores indicados
            |campo          |valor                      |
            |email          |rioseconicolas@gmail.com   |
            |password       |12345678                   |
        And Presiono el botón Cadastar
        Then Para el campo indicado visualizo la alerta esperada
            |nombreCampo    |mensaje                        |
            |nombre         |O campo Nome é obrigatório.    |

    Scenario: Validar los mensajes indicativos al no completar el campo E-mail
        Given Ingreso a la página de creacion de usuario
        When Completo el formulario con los valores indicados
            |campo          |valor                      |
            |nombre         |Nicolas Rioseco            |
            |password       |12345678                   |
        And Presiono el botón Cadastar
        Then Para el campo indicado visualizo la alerta esperada
            |nombreCampo    |mensaje                        |
            |email         |O campo E-mail é obrigatório.  |

    Scenario: Validar los mensajes indicativos al completar el campo E-mail con un valor invalido
        Given Ingreso a la página de creacion de usuario
        When Completo el formulario con los valores indicados
            |campo          |valor                      |
            |nombre         |Nicolas Rioseco            |
            |email          |rioseconicolas.gmail.com   |
            |password       |12345678                   |
        And Presiono el botón Cadastar
        Then Para el campo indicado visualizo la alerta esperada
            |nombreCampo   |mensaje                              |
            |email         |Por favor, insira um e-mail válido.  |

    Scenario: Validar los mensajes indicativos al no completar el campo Contraseña
        Given Ingreso a la página de creacion de usuario
        When Completo el formulario con los valores indicados
            |campo          |valor                      |
            |nombre         |Nicolas Rioseco            |
            |email          |rioseconicolas@gmail.com   |
        And Presiono el botón Cadastar
        Then Para el campo indicado visualizo la alerta esperada
            |nombreCampo    |mensaje                        |
            |password       |O campo Senha é obrigatório.   |

    Scenario: Validar los mensajes indicativos al completar el campo Contraseña con un valor invalido
        Given Ingreso a la página de creacion de usuario
        When Completo el formulario con los valores indicados
            |campo          |valor                      |
            |nombre         |Nicolas Rioseco            |
            |email          |rioseconicolas@gmail.com   |
            |password       |1234567                    |
        And Presiono el botón Cadastar
        Then Para el campo indicado visualizo la alerta esperada
            |nombreCampo    |mensaje                                      |
            |password       |A senha deve conter ao menos 8 caracteres.   |

    Scenario Outline: Validar que se crea el nuevo usuario al completar correctamente todos los campos
        Given Ingreso a la página de creacion de usuario
        When Completo todos los campos con valores validos: "<nombre>", "<email>" y "<password>"
        And Presiono el botón Cadastar
        Then Genero correctamente el nuevo usuario
        
        Examples:
        |nombre         |email                      |password   |
        |Nicolas Rioseco|rioseconicolas@gmail.com   |12345678   |
        |Nicolas Rioseco|rioseconicolas@gmail.com   |12345678   |

    Scenario: Validar que se crea el nuevo usuario al completar correctamente todos los campos
        Given Ingreso a la página de creacion de usuario
        And Genero correctamente dos nuevo usuario
            |nombre         |email                      |password   |
            |Nicolas Rioseco|rioseconicolas@gmail.com   |12345678   |
            |Nicolas Rioseco|rioseconicolas@gmail.com   |12345678   |
        And Presiono el botón Cadastar
        And Elimino el primer registro
        Then Valido que se elimina correctamente
