%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% This   : juwit.cls                                                           %
% Author : Sebastian Faase                                                     %
% Licence: The MIT License (MIT) http://opensource.org/licenses/MIT            %
% About  : template for juwit editor                                           %
% Version: 0.7                                                                 %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\RequirePackage[utf8]{inputenc}               % use input encoding utf8

% DEFINITIONS
%-------------------------------------------------------------------------------
\def\defaultFontSize#1{\def\@defaultFontSize{#1}}
\def\topSpace#1{\def\@topSpace{#1}}
\def\buttomSpace#1{\def\@buttomSpace{#1}}
\def\leftBoarderSpace#1{\def\@leftBoarderSpace{#1}}
\def\rightBoarderSpace#1{\def\@rightBoarderSpace{#1}}
\def\corporateLogo#1{\def\@corporateLogo{#1}}
\def\corporateLogoSize#1{\def\@corporateLogoSize{#1}}
\def\headerSpace#1{\def\@headerSpace{#1}}
\def\recipientName#1{\def\@recipientName{#1}}
\def\recipientStreet#1{\def\@recipientStreet{#1}}
\def\recipientCity#1{\def\@recipientCity{#1}}
\def\senderName#1{\def\@senderName{#1}}
\def\senderStreet#1{\def\@senderStreet{#1}}
\def\senderCity#1{\def\@senderCity{#1}}


% BOOLS
%-------------------------------------------------------------------------------
\newif\if@hasCorporateLogo
\newif\if@isLetter
\newif\if@expertMode


% INITIATE BOOL
%-------------------------------------------------------------------------------
\@hasCorporateLogotrue
\@isLettertrue
\@expertModetrue

% INITIATE DEFINITIONS
%-------------------------------------------------------------------------------
\defaultFontSize{11pt}    % 10pt-12pt
\if@isLetter
\recipientName{Manfred Müstermann}
\recipientStreet{Müsterstraße 90}
\recipientCity{14193 Berlin}
\senderName{Manfred Müstermann}
\senderStreet{Müsterstraße 90}
\senderCity{14193 Berlin}
\fi
\leftBoarderSpace{25mm}
\rightBoarderSpace{25mm}
\topSpace{40mm}
\buttomSpace{20mm}
\headerSpace{10mm}
\corporateLogo{logo.png}
%\corporateLogo{./server/_texFiles/logo.png}
\corporateLogoSize{60mm}


% LaTeX - VERSION
%-------------------------------------------------------------------------------
\NeedsTeXFormat{LaTeX2e}


% CLASS DESCRIPTION
%-------------------------------------------------------------------------------
\ProvidesClass{juwit}[2015/03/02 class file for juwit editor] 


% EXTENDS CLASS ARTICLE
%-------------------------------------------------------------------------------
\LoadClass[\@defaultFontSize]{article}


% PACKAGES
%-------------------------------------------------------------------------------
\RequirePackage{sectsty}                      % Better Sections
\RequirePackage{leading}                      % Linespacing
\RequirePackage[left = \@leftBoarderSpace,    % < Page geometry
                right = \@rightBoarderSpace,  % -
                top = \@topSpace,             % -
                bottom = \@buttomSpace,       % -
                headheight=40mm,              % -
                headsep = \@headerSpace]      % -
                {geometry}                    % >
\RequirePackage{amsfonts}                     % more symbols
\RequirePackage{lmodern}                      % replace default font \
\RequirePackage[T1]{fontenc}                  % with Latin Modern
\RequirePackage{textcomp}                     % euro symbol (and MoreZ)
\RequirePackage{enumitem}                     % better lists
\RequirePackage{graphicx}                     % support graphic
\RequirePackage{xcolor}                       % support color
\RequirePackage{fancyhdr}                     % header/footer
\RequirePackage{lipsum}                       % blindtext for testing
\RequirePackage[pscoord]{eso-pic}             % Draw where you want
\if@expertMode
\RequirePackage{amsmath}                      % amsmath for formulas
\fi


% GLOBAL SETTINGS
%-------------------------------------------------------------------------------
\pagestyle{fancy}                             % use fancyhdr pagestyle
\setlist[]{parsep=0pt, itemsep=0pt,           % < itemize and enumerate spacing
           partopsep=0pt, topsep=0pt}         % >
\leading{13.5pt}                              % Linespacing
%\sectionfont{\nohang}                        % unused
\sectionfont{\fontsize{14.4pt}{1em}           % < define section font
             \selectfont}                     % >
\subsectionfont{\fontsize{12pt}{1em}          % < define subsection font
                \selectfont}                  % >


% NEW COMMANDS
%-------------------------------------------------------------------------------
\newcommand{\placetextbox}[3]{%
  \setbox0=\hbox{#3}% 
  \AddToShipoutPictureFG*{% 
    \put(#1,#2){{#3}}%
  }%
}%

\DeclareRobustCommand{\juwit}                 % < \juwit is juwit logo
  {                                           %   -
    \Large{j\kern-.1em}%                      %   -
    \small{u\kern-.25em}%                     %   - 
    \LARGE{w\kern-.08em}%                     %   -
    \small{i\kern-.08em}%                     %   -
    \Large{t\kern-.1em}%                      %   -
  }                                           % >


% ELEMENTS
%-------------------------------------------------------------------------------

% itemize
\setlist[itemize,1]{label=\textbullet}        % < symbol layer 1
\setlist[itemize,2]{label=\textendash}        %   symbol layer 2
\setlist[itemize,3]{label=\guillemotright}    %   symbol layer 3 >

% enumerate
\setlist[enumerate,1]{{label=\arabic*.}}      % < customized enumerate
\setlist[enumerate,2]{{label=\roman*.}}       % -
\setlist[enumerate,3]{{label=                 % -
                       \emph{\alph*}.}}       % >

% header
% \setlength\headheight{26pt}                 % unused
\if@hasCorporateLogo
\lhead{\includegraphics[width=                % < show corporate logo
  \@corporateLogoSize]{\@corporateLogo}}      % >
\fi
\rhead{NAME\\adress}                          % show Author credentials
\renewcommand{\headrulewidth}{0.5pt}          % draw header lineseperator

% footer
\cfoot{Page \thepage}                         % show pagenumber centered
\lfoot{creadet with\juwit}                    % unused
\rfoot{}                                      % unused
\renewcommand{\footrulewidth}{0.5pt}          % draw footer lineseperator

% recipient

\if@isLetter

\placetextbox{\LenToUnit{26mm}}{\LenToUnit{226mm}}{\@recipientName}
\placetextbox{\LenToUnit{26mm}}{\LenToUnit{221mm}}{\@recipientStreet}
\placetextbox{\LenToUnit{26mm}}{\LenToUnit{216mm}}{\@recipientCity}

\placetextbox{\LenToUnit{125mm}}{\LenToUnit{236mm}}{\@senderName}
\placetextbox{\LenToUnit{125mm}}{\LenToUnit{231mm}}{\@senderStreet}
\placetextbox{\LenToUnit{125mm}}{\LenToUnit{226mm}}{\@senderCity}
\fi
