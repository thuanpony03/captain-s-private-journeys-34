import heroImage from "@/assets/hero-captain.jpg";

const PersonalStory = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            Gặp gỡ Road Captain của bạn
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant hover-lift">
                <img 
                  src={heroImage} 
                  alt="Captain Vinh" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-primary-foreground">Captain Vinh</h3>
                  <p className="text-primary-foreground/90">Your Road Captain</p>
                </div>
              </div>
            </div>
            
            {/* Story */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-foreground">
                  <span className="text-2xl font-semibold text-primary block mb-4">Chào bạn, tôi là Vinh Around.</span>
                </p>
                
                <p className="text-lg leading-relaxed text-foreground">
                  10 năm cầm lái trên những cung đường Mỹ, Úc, Âu, tôi nhận ra: 
                  <span className="font-semibold"> Người Việt mình đi du lịch 'khổ' quá.</span>
                </p>
                
                <p className="text-lg leading-relaxed text-foreground">
                  Khổ vì phải dậy sớm chạy tour, khổ vì ăn uống không hợp, khổ vì lo lắng thủ tục...
                </p>
                
                <p className="text-lg leading-relaxed text-foreground">
                  Tôi lập ra <span className="font-bold text-primary">Passport Lounge</span> không phải để bán tour đại trà. 
                  Tôi muốn trở thành <span className="font-semibold text-secondary">'Người bạn đường thổ địa'</span> của gia đình bạn.
                </p>
                
                <div className="bg-card p-6 rounded-xl border-l-4 border-secondary mt-6">
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 text-2xl">→</span>
                      <span>Tôi lái xe để bạn rảnh tay ngắm cảnh.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 text-2xl">→</span>
                      <span>Tôi lo vé máy bay để bạn thảnh thơi ngủ ngon.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 text-2xl">→</span>
                      <span>Tôi chọn quán ăn để bạn ấm bụng như ở nhà.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="font-script text-3xl text-primary italic">Captain Vinh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStory;
