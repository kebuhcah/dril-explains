
Sun, Kevin
1:59 PM (1 minute ago)
to me

1/ alright little freaks, i'm gonna reveal the unholy laws of "#Rust lifetimes" to you.. prepare your accounts for absolute devastation.'#developers

 

2/ the 'secret sauce' of Rust is its goddess, the devious "Borrow Checker". fear its power, but also use it wisely, for example:

 

struct Carcass<'a> {

bones: &'a str

}

 

3/ whats this " 'a "? a lifetime annotation, scholars of pure darkness (programming), told me. it ties the corpse (Carcass) to the bones(&str) that shall rot within it. #MadScientist

 

4/ Rust wont allow a reanimated corpse to go rogue, shambbling headless with no rotting bones.

 

fn main() {

let bones = String::from("Rotting Contents");

let carcass = Carcass { bones: &bones };

drop(bones);

println!("The terror begins: {}", carcass.bones);

}

 

5/ This one's for the"Zombie Resistant" among you, behold:

 

drop(bones); // no escape

println!("The terror begins: {}", carcass.bones) // cant use 'bones' that are already annihilated!! Borrow Checker > all

 

6/ use "life time annotation" to teach your slaves (#code) who is the master. they will dance & lurch to your every whim, hearts black as #Rust

 

7/ behold the immense power of "bnones":

 

fn gimme_bones(skeleton: &Carcass) -> &str {

skeleton.bones

}

 

8/ this dark spell binds skeletons, carcasses, and filth, chaining their fate together to form an unbreakable alliance of doom. #RustNation