import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Truck, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCard } from "@/components/BookCard";
import { featuredBooks } from "@/data/books";
import heroImage from "@/assets/book-wallpaper.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CountUp from "react-countup";
import award1 from "@/assets/award-winning.jpg";
import award2 from "@/assets/award-winning2.jpg";
import award3 from "@/assets/award-winning3.jpg";
import award4 from "@/assets/award-winning4.jpg";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Vast Collection",
      description: "Over 10,000+ books across all genres and categories"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $25 worldwide"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your payment information is always safe and secure"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Our customer service team is here to help anytime"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/20 to-secondary/10 min-h-screen px-4 flex items-center mb-[70px]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 mt-0 sm:mt-16 md:mt-24 mt-[70px] lg:mt-2">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
                  Discover Your Next
                  <span className="text-primary block">Great Read</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md text-pretty">
                  Explore thousands of books from bestselling authors, discover new genres, and find your perfect literary companion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/books">
                  <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
                    Browse Books 
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button> 
                </Link>
                <Link to="/categories"> 
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/20">
                    View Categories 
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">
                    <CountUp end={10} duration={3} separator="," />K+
                  </div>
                  <div className="text-sm text-muted-foreground">Books Available</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">
                    <CountUp end={50} duration={2} separator="," />K+
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Readers</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">
                    <CountUp end={500} duration={2} separator="," />+
                  </div>
                  <div className="text-sm text-muted-foreground">Award Winners</div>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                    <img src={award1} alt="Featured Book 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                    <img src={award2} alt="Featured Book 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                    <img src={award3} alt="Featured Book 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                    <img src={award4} alt="Featured Book 4" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Featured Books
            </h2>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="pb-8"
            >
              {featuredBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/80">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/80">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Delivery CTA Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="relative flex flex-col md:flex-row items-center bg-card text-card-foreground rounded-3xl overflow-hidden shadow-xl">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-8 lg:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Fast, Reliable Book Delivery
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                At <span className="text-primary font-semibold">BookHaven</span>, your next read is just a click away.  
                We carefully package and deliver books straight to your door, so you can enjoy reading without the wait.
              </p>

              {/* Features List */}
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li>• Secure and fast nationwide delivery</li>
                <li>• Protective packaging for every order</li>
                <li>• Easy tracking of your shipments</li>
                <li>• Hassle-free returns & exchanges</li>
              </ul>

              <Button
                asChild
                size="lg"
                className="mt-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl shadow-lg hover:opacity-90 transition"
              >
                <Link to="/books">Shop Now</Link>
              </Button>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 px-[12px] pb-[12px]">
              <img
                src={heroImage}
                alt="Book Delivery"
                className="object-cover w-full h-full rounded-[50px] md:rounded-r-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-muted via-background to-muted overflow-hidden">
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BookHaven?
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Experience books like never before with features that truly make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map((feature, index) => (
    <Card
      key={index}
      className="relative group p-6 bg-card/80 backdrop-blur-xl rounded-2xl border shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
    >
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/40 transition duration-500"></div>
      
      <CardHeader className="relative z-10">
        <div className="relative mx-auto mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/15 to-secondary/15 group-hover:from-primary/25 group-hover:to-secondary/25 transition">
            <feature.icon className="h-7 w-7 text-primary group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-muted-foreground group-hover:text-white transition-colors duration-300">
          {feature.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <CardDescription className="text-sm sm:text-base text-muted-foreground group-hover:text-white leading-relaxed transition-colors duration-300">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  ))}
</div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-background to-muted text-muted-foreground pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              BookHaven
            </h3>
            <p className="text-sm leading-relaxed">
              Your trusted destination for books delivered straight to your door. 
              Explore worlds, gain knowledge, and experience stories like never before.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition">Shop</a></li>
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-primary transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <form className="flex flex-wrap items-center gap-2 w-full max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background text-foreground"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 text-sm transition shrink-0"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-primary transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-primary transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-primary transition"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} BookHaven. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for book lovers everywhere.</p>
        </div>
      </footer>

    </div>
  );
}
